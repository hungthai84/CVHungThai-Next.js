import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { promptText } = await req.json();
    const prompt = promptText?.trim() || "Phân tích ma trận năng lực toàn diện của Nguyễn Hùng Thái kết hợp giữa nền tảng CNTT và Năng lực Đào tạo & Thuyết trình chuyên nghiệp.";

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

    const systemInstruction = `Bạn là Trí Nhân - Cố vấn Chiến lược & Chuyên gia Phân tích Năng lực Lãnh đạo cấp cao.
Anh Nguyễn Hùng Thái có 22+ năm kinh nghiệm trong ngành Chăm sóc Khách hàng (CSKH / Contact Center), từng đào tạo tại MobiFone, Prudential, Dale Carnegie, VietnamWorks và tốt nghiệp Cử nhân Công nghệ Thông tin tại Trường ĐH Công nghệ Sài Gòn (STU), sở hữu các chứng nhận kỹ thuật CCNA, MCSA, Big Data, Web UI/UX.
Hãy phân tích sắc sảo, tự tin, chuyên nghiệp, khích lệ và đưa ra góc nhìn tầm nhìn xa cho anh Hùng Thái.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ Gemini API.");
    }

    return NextResponse.json({ text: text.trim() });
  } catch (err: any) {
    console.error("Education analysis error:", err);
    if (err?.message?.includes("resource_exhausted") || err?.message?.includes("429") || err?.status === 429) {
      return NextResponse.json({
        text: "💡 **Phân tích Cố vấn Chiến lược (Chế độ Dự phòng Quota)**:\n\nAnh Nguyễn Hùng Thái sở hữu nền tảng hiếm có kết hợp sâu sắc giữa **Công nghệ thông tin (Cử nhân CNTT - STU, chứng nhận CCNA/MCSA)** và **22+ năm lãnh đạo vận hành Dịch vụ Khách hàng / Contact Center** tại các tập đoàn lớn (MobiFone, Prudential, Finviet, Garena, MoMo).\n\n**Điểm sáng chiến lược**:\n1. **Tư duy Chuyển đổi số & Tự động hóa**: Khả năng ứng dụng công nghệ (CRM, AI Voicebot, Ticketing Systems) vào tối ưu hóa vận hành quy mô lớn (50-130+ nhân sự).\n2. **Kỹ năng Lãnh đạo & Đào tạo xuất sắc**: Từng đào tạo và chuẩn hóa quy trình cho hàng trăm nhân sự, xây dựng chỉ số SLA >98% và CSAT lên tới 96.5%.\n3. **Tầm nhìn Tương lai**: Sẵn sàng đảm nhận các vị trí Quản lý Cấp cao (Head of CX, Director of Customer Operations) trong kỷ nguyên AI và Chuyển đổi số toàn diện."
      });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
