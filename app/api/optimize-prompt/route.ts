import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  let promptText = "";
  let mode = "";
  try {
    const body = await req.json();
    promptText = body.promptText || "";
    mode = body.mode || "";
    if (!promptText) {
      return NextResponse.json({ error: "Yêu cầu cung cấp nội dung prompt gốc." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    let systemInstruction = "Bạn là chuyên gia thiết kế và viết prompt kỹ thuật tối ưu hóa cho AI Agent lập trình và thiết kế giao diện.";
    let contents = `Hãy chuyển đổi yêu cầu thiết kế thô tục, đơn giản từ người dùng thành một prompt chuyên nghiệp, rõ ràng, giàu chi tiết kỹ thuật cho Agent AI thực hiện xuất sắc.
Yêu cầu người dùng: "${promptText}"

Hãy tập trung vào việc mô tả chính xác về:
1. Bố cục và cấu trúc (Layout, Grid, Flexbox, Spacing)
2. Màu sắc, chất liệu và độ tương phản (Neutrals, Accent Colors, Glassmorphism, Elevations, Borders, Corners)
3. Kiểu chữ và cấp bậc hiển thị (Typography, Font-sizes, weights, leading)
4. Hiệu ứng động và chuyển tiếp mượt mà (Micro-interactions, Transitions, Framer motion)
5. Khả năng tương thích thiết bị (Mobile-first responsive) và Accessibility (A11y, ARIA, focus ring)

`;

    if (mode === 'shorten') {
      contents += "Hãy viết một prompt cực kỳ ngắn gọn, súc tích nhưng vẫn giữ đầy đủ các từ khóa kỹ thuật cốt lõi và tiêu chuẩn chất lượng cao nhất.";
    } else if (mode === 'expand') {
      contents += "Hãy viết một prompt cực kỳ chi tiết, mở rộng, phân tích sâu từng góc cạnh thiết kế và tiêu chí chất lượng cao nhất để AI Agent có thể thực hiện hoàn hảo không sai sót.";
    } else {
      contents += "Hãy viết một prompt tối ưu, cân bằng giữa độ chi tiết và tính rõ ràng.";
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const optimized = result.text;
    if (!optimized) {
      throw new Error("Không nhận được phản hồi từ Gemini API.");
    }

    return NextResponse.json({ optimized: optimized.trim() });
  } catch (err: any) {
    console.error("Gemini optimization failed:", err);
    if (err?.message?.includes("resource_exhausted") || err?.message?.includes("429") || err?.status === 429) {
      return NextResponse.json({
        optimized: `[Fallback Prompt Tối Ưu]: Thiết kế giao diện chuyên nghiệp cho "${promptText}" với bố cục responsive hiện đại, hệ thống phân cấp typography sắc nét, màu sắc tinh tế, hiệu ứng glassmorphic mượt mà và tương tác chuẩn UI/UX doanh nghiệp.`,
        fallbackMessage: "API Gemini hiện đang đạt giới hạn hạn ngạch (Quota Exhausted). Hệ thống đã tạo prompt dự phòng chất lượng cao."
      });
    }
    return NextResponse.json({ error: "Tối ưu prompt thất bại: " + err.message }, { status: 500 });
  }
}
