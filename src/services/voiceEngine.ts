export type VoiceState = 'stopped' | 'speaking' | 'paused';

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private state: VoiceState = 'stopped';
  private stateChangeListeners: Array<(state: VoiceState) => void> = [];

  private rate: number = 0.95;
  private pitch: number = 1.0;
  private volume: number = 1.0;
  private selectedVoiceName: string = '';
  
  private currentVoice: string = 'Puck'; // default Gemini voice (Puck)
  private audioContext: AudioContext | null = null;
  private audioSource: AudioBufferSourceNode | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadSettings();
    }
  }

  public setGeminiVoice(voiceName: string) {
    this.currentVoice = voiceName;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ai_gemini_voice', voiceName);
    }
  }

  public getGeminiVoice(): string {
    return this.currentVoice;
  }

  public subscribeState(listener: (state: VoiceState) => void) {
    this.stateChangeListeners.push(listener);
    listener(this.state);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  private setState(newState: VoiceState) {
    this.state = newState;
    this.stateChangeListeners.forEach(l => l(newState));
  }

  public getState(): VoiceState {
    return this.state;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter(v => v.lang.includes('vi') || v.lang.includes('VI'));
  }

  public getAllVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public loadSettings() {
    try {
      const savedRate = localStorage.getItem('ai_voice_rate');
      if (savedRate) this.rate = parseFloat(savedRate);

      const savedPitch = localStorage.getItem('ai_voice_pitch');
      if (savedPitch) this.pitch = parseFloat(savedPitch);

      const savedVoice = localStorage.getItem('ai_voice_name');
      if (savedVoice) this.selectedVoiceName = savedVoice;
      
      const savedGemini = localStorage.getItem('ai_gemini_voice');
      if (savedGemini) this.currentVoice = savedGemini;
    } catch (e) {
      console.warn('Unable to load voice settings from localStorage');
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2, rate));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ai_voice_rate', this.rate.toString());
    }
  }

  public getRate(): number {
    return this.rate;
  }

  public async speak(text: string, onEnd?: () => void) {
    this.cancel();

    // Clean text for smooth speech synthesis (remove markdown formatting like **, ##)
    const cleanText = text
      .replace(/[*#_~`[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, 'liên kết')
      .trim();

    if (!cleanText) return;
    
    this.setState('speaking');

    try {
      // 1. Try Gemini TTS
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voiceName: this.currentVoice })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          await this.playPCMBase64(data.audio, 24000, onEnd);
          return;
        }
      }
    } catch (e) {
      console.error('Gemini TTS failed, falling back to Web Speech API', e);
    }
    
    // 2. Fallback to Web Speech API
    this.speakFallback(cleanText, onEnd);
  }

  private async playPCMBase64(base64: string, sampleRate: number, onEnd?: () => void) {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Convert PCM 16-bit to Float32
      const pcm16 = new Int16Array(bytes.buffer);
      const audioBuffer = this.audioContext.createBuffer(1, pcm16.length, sampleRate);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < pcm16.length; i++) {
        channelData[i] = pcm16[i] / 32768.0;
      }
      
      this.audioSource = this.audioContext.createBufferSource();
      this.audioSource.buffer = audioBuffer;
      this.audioSource.connect(this.audioContext.destination);
      
      this.audioSource.onended = () => {
        this.setState('stopped');
        if (onEnd) onEnd();
      };
      
      this.audioSource.start();
    } catch (e) {
      console.error("Web Audio API PCM playback failed", e);
      // Fallback
      this.speakFallback("Xin lỗi, có lỗi khi phát âm thanh.", onEnd);
    }
  }

  private speakFallback(cleanText: string, onEnd?: () => void) {
    if (!this.synth) {
      this.setState('stopped');
      if (onEnd) onEnd();
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    const voices = this.synth.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (this.selectedVoiceName) {
      selectedVoice = voices.find(v => v.name === this.selectedVoiceName);
    }
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      this.setState('stopped');
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') {
        return;
      }
      this.setState('stopped');
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      this.setState('stopped');
    }
  }

  public pause() {
    if (this.synth && this.state === 'speaking') {
      this.synth.pause();
      this.setState('paused');
    }
  }

  public resume() {
    if (this.synth && this.state === 'paused') {
      this.synth.resume();
      this.setState('speaking');
    }
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.audioSource) {
      try {
        this.audioSource.stop();
      } catch(e) {}
      this.audioSource = null;
    }
    this.setState('stopped');
  }
}

export const voiceEngine = new VoiceEngine();
