import type { VercelRequest, VercelResponse } from "@vercel/node";

interface RequestBody {
  name?: string;
  email?: string;
  message?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body as RequestBody;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const token = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing TELEGRAM_TOKEN or TELEGRAM_CHAT_ID");
      return res
        .status(500)
        .json({ success: false, error: "Server configuration error" });
    }

    const text = `📩 Нове повідомлення з портфоліо\n\n👤 Ім'я: ${name.trim()}\n📧 Email: ${email.trim()}\n💬 Повідомлення: ${message.trim()}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error("Telegram API error:", errorData);
      return res
        .status(502)
        .json({ success: false, error: "Failed to send message" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("send-message error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
