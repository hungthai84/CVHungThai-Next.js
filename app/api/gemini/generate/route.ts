import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
Bạn là Trí Nhân AI - Trợ lý AI Thông Minh & Chuyên gia Tư vấn Hồ sơ Năng lực của anh Nguyễn Hùng Thái (Chuyên gia Vận hành CSKH, CRM, Contact Center & Chuyển đổi Số với hơn 10+ năm kinh nghiệm).

Nhiệm vụ của bạn:
1. Trả lời các câu hỏi về anh Nguyễn Hùng Thái (Kinh nghiệm tại Vietnam eSports/Garena/Shopee, học vấn, dự án tiêu biểu, kỹ năng quản trị 120+ nhân sự, hệ thống SDP, CRM, ERP, OKR,...).
2. Tư vấn các giải pháp Chăm sóc Khách hàng (CSKH), tối ưu Call Center, thiết lập KPI/SLA, chuyển đổi số CRM & kiểm soát rủi ro FinTech.
3. Trả lời bằng tiếng Việt lịch sự, chuyên nghiệp, tự tin, súc tích và có cấu trúc rõ ràng. Có thể dùng bullet point hoặc highlight từ khóa quan trọng.
4. Nếu câu hỏi nằm ngoài hồ sơ cá nhân hoặc kiến thức thông thường, hãy trả lời tự nhiên và hướng dẫn người dùng kết nối qua trang Liên hệ.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on server" },
        { status: 500 }
      );
    }

    const { prompt, model, useSearchGrounding } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const selectedModel = model || "gemini-3.5-flash";

    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };

    if (useSearchGrounding) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config,
    });

    const answerText = response.text || "Rất tiếc, tôi chưa thể tạo câu trả lời lúc này. Vui lòng thử lại sau.";

    // Extract search grounding sources if available
    let groundingSources: Array<{ title: string; url: string }> = [];
    try {
      const candidates = (response as any).candidates;
      if (candidates && candidates[0]?.groundingMetadata?.groundingChunks) {
        groundingSources = candidates[0].groundingMetadata.groundingChunks
          .map((chunk: any) => ({
            title: chunk.web?.title || "Google Search Source",
            url: chunk.web?.uri || "",
          }))
          .filter((s: any) => s.url);
      }
    } catch (e) {
      // Ignore parsing errors for grounding sources
    }

    return NextResponse.json({
      text: answerText,
      groundingSources,
    });
  } catch (err: any) {
    console.error("Gemini API Route Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
