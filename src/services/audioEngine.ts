import { SoundPackType, AmbientSoundType } from "../types/sound";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientSource: { stop: () => void } | null = null;
  private ambientGainNode: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public unlockAudio() {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  // Play crisp click sound based on sound pack
  public playClick(pack: SoundPackType = "modern", volume: number = 0.8) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.5)), now);
      masterGain.connect(ctx.destination);

      if (pack === "cyber") {
        // Cyber: Dual frequency FM chirp
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(1400, now);
        osc1.frequency.exponentialRampToValueAtTime(320, now + 0.05);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(2200, now);
        osc2.frequency.exponentialRampToValueAtTime(440, now + 0.04);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.06);
        osc2.stop(now + 0.06);
      } else if (pack === "mechanical") {
        // Mechanical switch click
        const osc = ctx.createOscillator();
        const noise = this.createNoiseBuffer(ctx, 0.03);
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noise;

        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 1800;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.5, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

        noiseNode.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(masterGain);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        noiseNode.start(now);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (pack === "zen") {
        // Zen: Warm harmonic chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(528, now); // 528 Hz Love/Zen frequency
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.18);
      } else {
        // Modern (Default): Crisp crystal click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.045);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      // Audio autoplay guard
    }
  }

  // Play subtle hover tick
  public playHover(pack: SoundPackType = "modern", volume: number = 0.5) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const baseFreq = pack === "zen" ? 880 : pack === "cyber" ? 2200 : 1800;
      osc.frequency.setValueAtTime(baseFreq, now);

      const microVol = Math.max(0, Math.min(1, volume * 0.12));
      gain.gain.setValueAtTime(microVol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {}
  }

  // Play page transition whoosh / chord
  public playTransition(pack: SoundPackType = "modern", volume: number = 0.7) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.35, now);
      masterGain.connect(ctx.destination);

      const freqs = pack === "zen" ? [440, 660] : pack === "cyber" ? [520, 1040] : [587.33, 880]; // D5 and A5

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = pack === "cyber" ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.25);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.04);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }

  // Play success chime (Ascending major triad)
  public playSuccess(_pack: SoundPackType = "modern", volume: number = 0.8) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, now);
      masterGain.connect(ctx.destination);

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.5, now + i * 0.07 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.35);
      });
    } catch (e) {}
  }

  // Play switch toggle sound
  public playToggle(isOn: boolean, volume: number = 0.7) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      if (isOn) {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      } else {
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.06);
      }

      gain.gain.setValueAtTime(volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  // Start or change ambient sound
  public setAmbientSound(type: AmbientSoundType, volume: number = 0.3) {
    this.stopAmbientSound();
    if (type === "none") return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.001, now);
      ambientGain.gain.linearRampToValueAtTime(volume * 0.25, now + 1.5);
      ambientGain.connect(ctx.destination);
      this.ambientGainNode = ambientGain;

      if (type === "rain") {
        // Synthesized soothing rain noise
        const buffer = this.createNoiseBuffer(ctx, 4);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1000;

        source.connect(filter);
        filter.connect(ambientGain);
        source.start();

        this.ambientSource = {
          stop: () => {
            try {
              source.stop();
              source.disconnect();
            } catch (e) {}
          }
        };
      } else if (type === "space-drone") {
        // Space Drone: Low sine + triangle detuned oscillators with LFO filter
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = "sine";
        osc2.type = "triangle";
        osc1.frequency.value = 65.41; // C2
        osc2.frequency.value = 65.75; // Subtle detune for phasing drone

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 400;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(ambientGain);

        osc1.start();
        osc2.start();

        this.ambientSource = {
          stop: () => {
            try {
              osc1.stop();
              osc2.stop();
              osc1.disconnect();
              osc2.disconnect();
            } catch (e) {}
          }
        };
      } else if (type === "zen-breeze") {
        // Zen Breeze: resonant filtered pink-ish noise
        const buffer = this.createNoiseBuffer(ctx, 4);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 550;
        filter.Q.value = 1.8;

        source.connect(filter);
        filter.connect(ambientGain);
        source.start();

        this.ambientSource = {
          stop: () => {
            try {
              source.stop();
              source.disconnect();
            } catch (e) {}
          }
        };
      }
    } catch (e) {}
  }

  public updateAmbientVolume(volume: number) {
    if (this.ambientGainNode && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGainNode.gain.cancelScheduledValues(now);
        this.ambientGainNode.gain.linearRampToValueAtTime(volume * 0.25, now + 0.2);
      } catch (e) {}
    }
  }

  public stopAmbientSound() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch (e) {}
      this.ambientSource = null;
    }
    if (this.ambientGainNode) {
      try {
        this.ambientGainNode.disconnect();
      } catch (e) {}
      this.ambientGainNode = null;
    }
  }

  private createNoiseBuffer(ctx: AudioContext, durationSec: number = 2): AudioBuffer {
    const bufferSize = ctx.sampleRate * durationSec;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      // Pink-ish filtered noise
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }
    return buffer;
  }
}

export const audioEngine = new AudioEngine();
