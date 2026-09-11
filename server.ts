import express from "express";
import path from "path";
import next from "next";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API route for AI HTML & CodePen analysis
app.post("/api/analyze-html-codepen", async (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: "Yêu cung cấp URL hoặc mã HTML." });
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
        // Fallback to original URL
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

  try {
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

    // Truncate content to avoid token overflow
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
    return res.json({ results: parsedResults });
  } catch (err: any) {
    console.error("Gemini analysis failed:", err);
    if (err?.message?.includes("resource_exhausted") || err?.message?.includes("429") || err?.status === 429) {
      return res.status(200).json({
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
    return res.status(500).json({ error: "Phân tích thất bại: " + err.message });
  }
});

// API route for AI prompt optimization
app.post("/api/optimize-prompt", async (req, res) => {
  const { promptText, mode } = req.body; // mode can be 'normal', 'shorten', 'expand'
  if (!promptText) {
    return res.status(400).json({ error: "Yêu cầu cung cấp nội dung prompt gốc." });
  }

  try {
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

    return res.json({ optimized: optimized.trim() });
  } catch (err: any) {
    console.error("Gemini optimization failed:", err);
    if (err?.message?.includes("resource_exhausted") || err?.message?.includes("429") || err?.status === 429) {
      return res.status(200).json({
        optimized: `[Fallback Prompt Tối Ưu]: Thiết kế giao diện chuyên nghiệp cho "${promptText}" với bố cục responsive hiện đại, hệ thống phân cấp typography sắc nét, màu sắc tinh tế, hiệu ứng glassmorphic mượt mà và tương tác chuẩn UI/UX doanh nghiệp.`,
        fallbackMessage: "API Gemini hiện đang đạt giới hạn hạn ngạch (Quota Exhausted). Hệ thống đã tạo prompt dự phòng chất lượng cao."
      });
    }
    return res.status(500).json({ error: "Tối ưu prompt thất bại: " + err.message });
  }
});

// API route for Education AI analysis
app.post("/api/ai-analyze-education", async (req, res) => {
  const { promptText } = req.body;
  const prompt = promptText?.trim() || "Phân tích ma trận năng lực toàn diện của Nguyễn Hùng Thái kết hợp giữa nền tảng CNTT và Năng lực Đào tạo & Thuyết trình chuyên nghiệp.";

  try {
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

    return res.json({ text: text.trim() });
  } catch (err: any) {
    console.error("Education analysis error:", err);
    if (err?.message?.includes("resource_exhausted") || err?.message?.includes("429") || err?.status === 429) {
      return res.status(200).json({
        text: "💡 **Phân tích Cố vấn Chiến lược (Chế độ Dự phòng Quota)**:\n\nAnh Nguyễn Hùng Thái sở hữu nền tảng hiếm có kết hợp sâu sắc giữa **Công nghệ thông tin (Cử nhân CNTT - STU, chứng nhận CCNA/MCSA)** và **22+ năm lãnh đạo vận hành Dịch vụ Khách hàng / Contact Center** tại các tập đoàn lớn (MobiFone, Prudential, Shopee, Garena, MoMo).\n\n**Điểm sáng chiến lược**:\n1. **Tư duy Chuyển đổi số & Tự động hóa**: Khả năng ứng dụng công nghệ (CRM, AI Voicebot, Ticketing Systems) vào tối ưu hóa vận hành quy mô lớn (50-130+ nhân sự).\n2. **Kỹ năng Lãnh đạo & Đào tạo xuất sắc**: Từng đào tạo và chuẩn hóa quy trình cho hàng trăm nhân sự, xây dựng chỉ số SLA >98% và CSAT lên tới 96.5%.\n3. **Tầm nhìn Tương lai**: Sẵn sàng đảm nhận các vị trí Quản lý Cấp cao (Head of CX, Director of Customer Operations) trong kỷ nguyên AI và Chuyển đổi số toàn diện."
      });
    }
    return res.status(500).json({ error: err.message });
  }
});

// API route for TTS (Gemini)
app.post("/api/tts", async (req, res) => {
  const { text, voiceName } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ audio: null, fallback: true, message: "GEMINI_API_KEY missing, using browser speech synthesis" });
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
      return res.json({ audio: base64Audio, mimeType: "audio/pcm" });
    } else {
      console.warn("Gemini TTS returned no audio data, triggering browser fallback.");
      return res.json({ audio: null, fallback: true, message: "No audio returned from Gemini, using Web Speech API" });
    }

  } catch (error: any) {
    console.warn("TTS endpoint notice (using client speech fallback):", error?.message || error);
    return res.json({ audio: null, fallback: true, error: error?.message || "TTS error" });
  }
});

async function startServer() {
  const dev = process.env.NODE_ENV !== "production";
  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`> Next.js Custom Server running on http://localhost:${PORT}`);
  });
}

startServer();
