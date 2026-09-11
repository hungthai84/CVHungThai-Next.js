import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { text, voiceName } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ audio: null, fallback: true, message: "GEMINI_API_KEY missing, using browser speech synthesis" });
    }
    
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const requestedVoice = voiceName || 'Puck';

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: requestedVoice },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      return NextResponse.json({ audio: base64Audio, mimeType: "audio/pcm" });
    } else {
      console.warn("Gemini TTS returned no audio data, triggering browser fallback.");
      return NextResponse.json({ audio: null, fallback: true, message: "No audio returned from Gemini, using Web Speech API" });
    }

  } catch (error: any) {
    console.warn("TTS endpoint notice (using client speech fallback):", error?.message || error);
    return NextResponse.json({ audio: null, fallback: true, error: error?.message || "TTS error" });
  }
}
