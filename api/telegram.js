// Máy chủ nhỏ trên Vercel: nhận đơn từ website rồi gửi sang Telegram.
// Token và Chat ID nằm trong "Environment Variables" của Vercel, không nằm trong mã.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { type, text } = req.body || {};
  const token =
    type === 'order'
      ? process.env.TELEGRAM_ORDER_BOT_TOKEN
      : type === 'test-ride'
      ? process.env.TELEGRAM_TEST_RIDE_BOT_TOKEN
      : null;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Chưa cấu hình Telegram trên máy chủ' });
  }
  if (typeof text !== 'string' || !text.trim() || text.length > 3500) {
    return res.status(400).json({ ok: false, error: 'Nội dung không hợp lệ' });
  }

  try {
    const t = token.trim();
    const key = t.startsWith('bot') ? t : `bot${t}`;
    const r = await fetch(`https://api.telegram.org/${key}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId.trim(), text, parse_mode: 'HTML' }),
    });
    const data = await r.json().catch(() => null);
    if (r.ok && data?.ok) return res.status(200).json({ ok: true });
    return res.status(502).json({ ok: false, error: data?.description || 'Telegram từ chối' });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Không kết nối được Telegram' });
  }
}
