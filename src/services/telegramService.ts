/**
 * Dịch vụ gửi thông báo Đặt Lịch Lái Thử & Đặt Mua Xe về Telegram.
 * Token bot và Chat ID được giữ bí mật trên máy chủ (file api/telegram.js),
 * KHÔNG để trong mã của trang web.
 */

// Chống lỗi định dạng / chèn mã HTML từ nội dung khách nhập
const esc = (v: unknown): string =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export interface TestRidePayload {
  bookingCode: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  vehicleName: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface OrderPayload {
  orderId: string;
  fullName: string;
  phone: string;
  address: string;
  vehicleName: string;
  price: number;
  quantity: number;
  total: number;
  color?: string;
  city?: string;
  notes?: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    color?: string;
  }>;
}

export interface TelegramPushResult {
  success: boolean;
  error?: string;
}

// Lưu trữ cục bộ bảo đảm dữ liệu đơn hàng / lái thử không bị thất lạc
function saveToLocalBackup(type: 'test-ride' | 'order', data: unknown) {
  try {
    const key = type === 'test-ride' ? 'gofold_test_ride_records' : 'gofold_order_records';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({
      ...(data as Record<string, unknown>),
      savedAt: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save to localStorage backup', err);
  }
}

/**
 * Gửi thông báo Lái Thử Xe tới Telegram Bot (@dangkylaithu_bot)
 */
export async function sendTestRideToTelegram(payload: TestRidePayload): Promise<TelegramPushResult> {
  saveToLocalBackup('test-ride', payload);

  const message = [
    `🛵 <b>ĐĂNG KÝ LÁI THỬ XE GOFOLD MỚI</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🎫 <b>Mã lịch hẹn:</b> <code>#${esc(payload.bookingCode)}</code>`,
    `🚲 <b>Mẫu xe:</b> <b>${esc(payload.vehicleName)}</b>`,
    `📅 <b>Ngày lái thử:</b> <b>${esc(payload.date)}</b> (${esc(payload.timeSlot)})`,
    `👤 <b>Họ và tên khách:</b> <b>${esc(payload.fullName)}</b>`,
    `📞 <b>Số điện thoại:</b> <b>${esc(payload.phoneNumber)}</b>`,
    `🏠 <b>Địa chỉ lái thử:</b> <b>${esc(payload.address)}</b>`,
    payload.notes ? `📝 <b>Ghi chú:</b> ${esc(payload.notes)}` : '',
    `━━━━━━━━━━━━━━━━━━━━`,
    `📍 <b>Chính sách:</b> Miễn phí ≤ 2km từ cơ sở GOFOLD tại Hà Đông, Tây Hồ, Nam Từ Liêm. Cự ly > 2km phí 50k (hoàn 100% khi chốt mua xe).`,
    `⏰ <i>Gửi tự động: ${new Date().toLocaleString('vi-VN')}</i>`
  ].filter(Boolean).join('\n');

  return pushToTelegram(message, 'test-ride');
}

/**
 * Gửi thông báo Đặt Mua Xe tới Telegram Bot (@Gofold_bot)
 */
export async function sendOrderToTelegram(payload: OrderPayload): Promise<TelegramPushResult> {
  saveToLocalBackup('order', payload);

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(payload.total);

  const vehicleTitle = payload.vehicleName || payload.items?.[0]?.name || 'GoFold X3';
  const quantityCount = payload.quantity || payload.items?.[0]?.quantity || 1;

  const message = [
    `🛒 <b>ĐƠN ĐẶT MUA XE MỚI - GOFOLD STORE</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🧾 <b>Mã đơn hàng:</b> <code>#${esc(payload.orderId)}</code>`,
    `🚲 <b>Mẫu xe đặt:</b> <b>${esc(vehicleTitle)}</b> ${payload.color ? `(${esc(payload.color)})` : ''}`,
    `🔢 <b>Số lượng:</b> <b>${quantityCount}</b> chiếc`,
    `💰 <b>Tổng tiền:</b> <b>${formattedTotal}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Họ và tên khách:</b> <b>${esc(payload.fullName)}</b>`,
    `📞 <b>Số điện thoại:</b> <b>${esc(payload.phone)}</b>`,
    `🏠 <b>Địa chỉ nhận xe:</b> <b>${esc(payload.address)}</b>`,
    payload.notes ? `📝 <b>Ghi chú:</b> ${esc(payload.notes)}` : '',
    `━━━━━━━━━━━━━━━━━━━━`,
    `📞 <i>Cửa hàng vui lòng gọi lại khách theo SĐT trên để xác nhận đơn và bàn giao xe!</i>`,
    `⏰ <i>Gửi tự động: ${new Date().toLocaleString('vi-VN')}</i>`
  ].filter(Boolean).join('\n');

  return pushToTelegram(message, 'order');
}

/**
 * Gửi tin về máy chủ của website (/api/telegram), máy chủ mới gọi Telegram.
 */
async function pushToTelegram(
  textMessage: string,
  type: 'test-ride' | 'order'
): Promise<TelegramPushResult> {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, text: textMessage }),
    });
    const data = await response.json().catch(() => null);
    if (response.ok && data?.ok) return { success: true };
    return { success: false, error: data?.error || `HTTP ${response.status}` };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
