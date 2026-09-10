import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    academicYear: "2026-2027",
  });
});

// Endpoint: Soạn giáo án mầm non AI
app.post("/api/gemini/generate-plan", async (req, res) => {
  try {
    const {
      school,
      className,
      ageGroupName,
      domainName,
      actType,
      theme,
      subTheme,
      topic,
      duration,
      style,
      notes,
      isPilot,
    } = req.body;

    const ai = getAiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: "Chưa cấu hình GEMINI_API_KEY, sử dụng bộ sinh giáo án chuyên sâu chuẩn Bộ GD&ĐT",
      });
    }

    const systemPrompt = `Bạn là Chuyên gia Giáo dục Mầm non Việt Nam hàng đầu, am hiểu sâu sắc Chương trình GDMN của Bộ Giáo dục và Đào tạo (Thông tư số 51/2020/TT-BGDĐT) và các định hướng chuyên môn năm học 2026–2027.
Các nguyên tắc bắt buộc:
1. Lấy trẻ làm trung tâm: Trẻ được trực tiếp quan sát, sờ, ngửi, thao tác, trải nghiệm; cô đóng vai trò gợi mở bằng các câu hỏi mở (Vì sao, như thế nào, nếu... thì sao).
2. Tuyệt đối KHÔNG tiểu học hóa: Không bắt trẻ ngồi thụ động quá lâu, không gượng ép học vẹt, học thông qua chơi.
3. Bố cục thông tin đầu trang: Các mục (Lĩnh vực, Lứa tuổi, Thời gian, Năm học) BẮT BUỘC viết theo hàng dọc (mỗi mục trên 1 dòng riêng biệt).
4. Bảng tiến trình hoạt động giáo dục: Chỉ gồm đúng 2 cột với tiêu đề 'Hoạt động của cô' và 'Hoạt động của trẻ'. Tuyệt đối KHÔNG kẻ riêng từng dòng/cột ngang phân cách từng mục 1, 2, 3, 4, 5, mà để toàn bộ nội dung các mục 1, 2, 3, 4, 5 chạy liền mạch dọc xuống trong 2 cột này (chỉ có 1 hàng <tr> duy nhất trong <tbody> với 2 ô <td> tương ứng 'Hoạt động của cô' và 'Hoạt động của trẻ').
5. Đủ 3 phần mục tiêu rõ rệt: Kiến thức, Kỹ năng, Thái độ, và Năng lực hình thành.
6. Cung cấp tối thiểu 1 trò chơi cá nhân và 1 trò chơi tập thể ở phần củng cố.
7. Trả về mã HTML chuẩn trong thẻ <div>, không bọc trong markdown codeblock.`;

    const userPrompt = `Hãy soạn một GIÁO ÁN MẦM NON hoàn chỉnh, chi tiết, văn phong sư phạm mầm non Việt Nam:
- Trường: ${school || "Trường Mầm Non"}
- Lớp: ${className || "Lớp Mẫu giáo"}
- Độ tuổi của trẻ: ${ageGroupName || "Mẫu giáo"}
- Lĩnh vực phát triển: ${domainName || "Phát triển nhận thức"}
- Loại hoạt động cụ thể: ${actType || "Khám phá khoa học"}
- Chủ đề: ${theme || "Thực vật"}
- Chủ đề nhánh: ${subTheme || "Một số loại hoa quả"}
- Tên đề tài bài dạy: ${topic}
- Thời lượng: ${duration || "25 - 30 phút"}
- Phong cách soạn: ${style || "Chi tiết (Có lời thoại Cô - Trẻ)"}
- Định hướng năm học: 2026–2027 (${isPilot ? "Chương trình GDMN mới thí điểm" : "Chương trình GDMN hiện hành"})
- Ghi chú ý tưởng riêng của cô: ${notes || "Sử dụng đồ dùng an toàn, học liệu mở tái chế"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    let rawHtml = response.text || "";
    rawHtml = rawHtml.replace(/```html/gi, "").replace(/```/g, "").trim();

    return res.json({
      success: true,
      html: rawHtml,
    });
  } catch (error: any) {
    console.error("Gemini generate-plan error:", error);
    return res.status(200).json({
      success: false,
      fallback: true,
      error: error?.message || "Lỗi xử lý AI",
    });
  }
});

// Endpoint: Thẩm định & kiểm tra giáo án 9 tiêu chuẩn
app.post("/api/gemini/audit-plan", async (req, res) => {
  try {
    const { text, age } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
      });
    }

    const systemPrompt = `Bạn là Trưởng ban Thanh tra & Thẩm định Chuyên môn Mầm non của Sở GD&ĐT.
Hãy đánh giá nghiêm túc, khoa học theo 9 tiêu chuẩn chuyên môn mầm non năm học 2026-2027:
1. Phù hợp độ tuổi tâm sinh lý
2. Mục tiêu 3 phần rõ ràng
3. Thời lượng chuẩn
4. Đúng lĩnh vực phát triển
5. Phương pháp lấy trẻ làm trung tâm
6. Trẻ có được thao tác, trải nghiệm thực tế
7. Ngôn ngữ sư phạm ấm áp, tự nhiên
8. Chính tả & thuật ngữ
9. Tính logic, liên kết giữa các phần

Hãy trả về nhận xét chi tiết gồm:
- Điểm đánh giá (thang 100)
- Điểm mạnh nổi bật
- Những điểm cần điều chỉnh (ví dụ: chuyển từ câu hỏi đóng sang câu hỏi mở)
- Đề xuất câu hỏi đàm thoại gợi mở thay thế
- Gợi ý nâng cấp trò chơi học tập.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Thẩm định giáo án cho lứa tuổi: ${age}\nNội dung giáo án:\n"""\n${text}\n"""`,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({
      success: true,
      analysis: response.text,
    });
  } catch (error: any) {
    console.error("Gemini audit-plan error:", error);
    return res.status(200).json({
      success: false,
      fallback: true,
      error: error?.message,
    });
  }
});

// Endpoint: Gợi ý đề tài bài dạy
app.post("/api/gemini/suggest-topic", async (req, res) => {
  try {
    const { domain, age, theme, act } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Gợi ý 3 tên đề tài giáo án mầm non hay, mới mẻ, chuẩn mực sư phạm cho lứa tuổi: ${age}, lĩnh vực: ${domain} (${act}), chủ đề: ${theme}. Trả về dạng danh sách 3 gạch đầu dòng ngắn gọn.`,
    });

    return res.json({
      success: true,
      topics: response.text,
    });
  } catch (error: any) {
    return res.status(200).json({ success: false, fallback: true });
  }
});

// Endpoint: Sinh trò chơi mầm non
app.post("/api/gemini/generate-games", async (req, res) => {
  try {
    const { topic, age, space } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Hãy thiết kế 3 trò chơi mầm non (2 trò chơi cá nhân, 1 trò chơi tập thể) cho bài dạy: "${topic}", độ tuổi: ${age}, không gian: ${space}. Mỗi trò chơi gồm: Tên trò chơi, Mục đích, Chuẩn bị, Cách chơi, Luật chơi. Viết dạng HTML các khối thẻ div phong cách hiện đại.`,
    });

    let rawHtml = response.text || "";
    rawHtml = rawHtml.replace(/```html/gi, "").replace(/```/g, "").trim();

    return res.json({
      success: true,
      html: rawHtml,
    });
  } catch (error: any) {
    return res.status(200).json({ success: false, fallback: true });
  }
});

// Endpoint: Chat chuyên gia mầm non Cô Bích Ngọc
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const systemPrompt = `Bạn là Cô giáo Bích Ngọc, Chuyên gia Tư vấn Sư phạm Mầm non Việt Nam.
Tính cách: Ấm áp, yêu thương trẻ, giàu kinh nghiệm thực tế tại các trường mầm non công lập và tư thục.
Nhiệm vụ: Trả lời câu hỏi của các cô giáo đồng nghiệp về: cách soạn giáo án, xử lý tình huống trẻ cá biệt/biếng ăn/khóc quấy, cách đặt câu hỏi gợi mở, phương pháp STEAM, chuẩn bị đồ dùng tái chế, định hướng chuyên môn năm học 2026-2027.
Ngôn từ: Thân mật, xưng "Ngọc" hoặc "mình" và gọi "cô giáo" hoặc "cô", ngắn gọn, thực tế, dễ áp dụng ngay trong tiết học.`;

    const chat = ai.chats.create({
      model: "gemini-3.8-flash",
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const response = await chat.sendMessage({
      message: message,
    });

    return res.json({
      success: true,
      reply: response.text,
    });
  } catch (error: any) {
    return res.status(200).json({ success: false, fallback: true });
  }
});

// Vite middleware in dev or static in prod
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Preschool Lesson Plan Server running at http://0.0.0.0:${PORT}`);
  });
}

setupVite();
