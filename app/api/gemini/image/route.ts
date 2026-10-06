import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on server" },
        { status: 500 }
      );
    }

    const { prompt, image, aspectRatio, imageSize, model } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const targetModel = model || "gemini-3.1-flash-image-preview";

    const parts: any[] = [];

    // If a source image is provided (base64 string or data URL), parse mimeType & raw base64 data
    if (image) {
      let mimeType = "image/png";
      let base64Data = image;

      if (image.includes(";base64,")) {
        const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          mimeType = matches[1];
          base64Data = matches[2];
        } else {
          base64Data = image.split(";base64,").pop();
        }
      }

      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      });
    }

    // Add text prompt part
    parts.push({ text: prompt });

    const config: any = {};
    if (aspectRatio || imageSize) {
      config.imageConfig = {
        aspectRatio: aspectRatio || "1:1",
        ...(imageSize ? { imageSize } : {}),
      };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: targetModel,
        contents: { parts },
        ...(Object.keys(config).length > 0 ? { config } : {}),
      });
    } catch (primaryErr: any) {
      console.warn(`Primary model ${targetModel} error, trying fallback:`, primaryErr?.message);
      const fallbackModel = targetModel.includes("preview")
        ? "gemini-3.1-flash-image"
        : "gemini-3.1-flash-lite-image";

      response = await ai.models.generateContent({
        model: fallbackModel,
        contents: { parts },
        ...(Object.keys(config).length > 0 ? { config } : {}),
      });
    }

    let generatedImageUrl = "";
    let explanationText = "";

    const candidates = response.candidates;
    if (candidates && candidates[0]?.content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/png";
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          explanationText += part.text + " ";
        }
      }
    }

    if (!generatedImageUrl) {
      return NextResponse.json(
        {
          error: "Không nhận được hình ảnh từ mô hình Gemini. Vui lòng thử lại với câu lệnh chi tiết hơn.",
          text: explanationText.trim(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: generatedImageUrl,
      text: explanationText.trim(),
    });
  } catch (err: any) {
    console.error("Gemini Image API Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate or edit image" },
      { status: 500 }
    );
  }
}
