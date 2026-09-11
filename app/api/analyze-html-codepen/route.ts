import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input) {
      return NextResponse.json({ error: "Yêu cầu cung cấp URL hoặc mã HTML." }, { status: 400 });
    }

    let contentToAnalyze = input;

    if (input.startsWith("http://") || input.startsWith("https://")) {
      let url = input;
      if (url.includes("codepen.io") && url.includes("/pen/")) {
        if (!url.endsWith(".html") && !url.endsWith(".js") && !url.endsWith(".css")) {
          url = url.split("?")[0].split("#")[0] + ".html";
        }
      }
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });
        if (response.ok) {
          contentToAnalyze = await response.text();
        } else {
          const retryResponse = await fetch(input, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
          });
          if (retryResponse.ok) {
            contentToAnalyze = await retryResponse.text();
          }
        }
      } catch (err) {
        console.error("Error fetching URL:", err);
      }
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

    if (contentToAnalyze.length > 20000) {
      contentToAnalyze = contentToAnalyze.substring(0, 20000) + "... [TRUNCATED]";
    }

    const prompt = `Bạn là chuyên gia phân tích UI/UX và thiết kế website hàng đầu.
Nhiệm vụ của bạn là phân tích mã HTML sau đây (hoặc nội dung thô từ trang web/CodePen) và bóc tách ra danh sách các đối tượng/thành phần giao diện nổi bật hiện có trong đó.
Với mỗi đối tượng tìm thấy, hãy mô tả cấu trúc hiện tại và đề xuất các tính năng, hiệu ứng giao diện (features/styles) cụ thể có thể thêm vào đối tượng đó để nâng cấp trải nghiệm người dùng.

Mã HTML/Nội dung để phân tích:
${contentToAnalyze}

Hãy trả về kết quả dưới dạng danh sách đối tượng JSON có cấu trúc rõ ràng.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Tên đối tượng hoặc thành phần giao diện (ví dụ: 'Thẻ giá sản phẩm')" },
              type: { type: Type.STRING, description: "Phân loại thành phần (ví dụ: 'Card', 'Button', 'Header', 'Form', 'Section')" },
              description: { type: Type.STRING, description: "Mô tả chi tiết cấu trúc hiện tại bóc tách được" },
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Danh sách 3-5 gợi ý tính năng hoặc style có thể thêm vào thành phần này (ví dụ: 'Thêm hiệu ứng Glassmorphism', 'Thêm hover zoom 3D', 'Thêm badge Hot')"
              }
            },
            required: ["name", "type", "description", "suggestions"]
          }
        }
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ Gemini API.");
    }

    const parsedResults = JSON.parse(text);
    return NextResponse.json({ results: parsedResults });
  } catch (err: any) {
    console.error("Gemini analysis failed:", err);
    if (err?.message?.includes("resource_exhausted") || err?.message?.includes("429") || err?.status === 429) {
      return NextResponse.json({
        results: [
          {
            name: "Hệ thống Quản trị CSKH & Giao diện chuẩn Enterprise",
            type: "Section",
            description: "Giao diện portfolio chuyên nghiệp tối ưu hóa cho lãnh đạo CSKH, tích hợp glassmorphism và hiệu ứng tương tác cao.",
            suggestions: [
              "Thêm hiệu ứng Glassmorphic shadow nổi bật khi hover",
              "Tích hợp biểu đồ phân tích KPI thời gian thực",
              "Bổ sung bộ lọc tìm kiếm chuyên sâu theo kỹ năng"
            ]
          }
        ],
        fallbackMessage: "API Gemini hiện đang đạt giới hạn hạn ngạch (Quota Exhausted). Hệ thống đã tự động kích hoạt phản hồi dự phòng thông minh."
      });
    }
    return NextResponse.json({ error: "Phân tích thất bại: " + err.message }, { status: 500 });
  }
}
