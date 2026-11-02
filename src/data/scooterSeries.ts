import { ScooterSeriesInfo } from '../types';

export const SCOOTER_SERIES_LIST: ScooterSeriesInfo[] = [
  {
    id: 'gt',
    name: 'GT Series',
    badge: 'SuperScooter Đỉnh Cao',
    tagline: 'Quái kiệt tốc độ & Hiệu năng đua xe thể thao',
    description: 'Đỉnh cao kỹ thuật xe điện Segway: Hệ dẫn động 2 cầu kép mạnh mẽ, vận tốc tối đa 70 km/h, hệ thống kiểm soát lực kéo SDTC và giảm xóc thủy lực điều chỉnh 15 cấp độ.',
    speedRange: 'Lên tới 70 km/h',
    rangeAvg: 'Quãng đường tới 90 km',
    heroImage: '/assets/images/segway_hero_scooter_1790783109913.jpg',
    bannerHeadline: 'Bứt phá mọi giới hạn tốc độ và gia tốc',
    keyHighlights: [
      'Công suất cực đại 3000W với 2 động cơ Hub Motor',
      'Màn hình OLED trong suốt đầu tiên trên thế giới',
      'Hệ thống kiểm soát lực kéo động lực học Segway SDTC',
      'Lốp tự vá 11 inch chống thủng với lớp thạch Jelly'
    ]
  },
  {
    id: 'max',
    name: 'MAX Series',
    badge: 'Chuyên Gia Đường Dài',
    tagline: 'Vua xe điện đô thị: Quãng đường 70 km & Giảm xóc đôi',
    description: 'Dòng xe bán chạy nhất toàn cầu cho việc đi lại hàng ngày. Được nâng cấp với hệ thống giảm xóc đôi trước/sau, định vị Apple Find My và công nghệ tối ưu hóa năng lượng RideyLONG™.',
    speedRange: 'Lên tới 35 km/h',
    rangeAvg: 'Quãng đường tới 70 km',
    heroImage: '/assets/images/segway_max_series_1790784129428.jpg',
    bannerHeadline: 'Hành trình êm ái, bứt phá mọi cung đường đô thị',
    keyHighlights: [
      'Hệ thống giảm xóc thủy lực kép trước và sau siêu êm',
      'Tích hợp công nghệ định vị toàn cầu Apple Find My',
      'Động cơ dẫn động cầu sau 900W leo dốc 22%',
      'Xi-nhan trước sau tích hợp trên ghi-đông chuẩn Châu Âu'
    ]
  },
  {
    id: 'f',
    name: 'F Series',
    badge: 'Đô Thị Thông Minh',
    tagline: 'Cân bằng hoàn hảo giữa hiệu năng, trọng lượng và an toàn',
    description: 'Thiết kế hiện đại thanh lịch cho dân văn phòng và người trẻ đô thị. Trang bị hệ thống kiểm soát lực kéo chống trượt TCS, đèn xi-nhan và khung sườn hợp kim nhôm gia cường vững chắc.',
    speedRange: 'Lên tới 32 km/h',
    rangeAvg: 'Quãng đường tới 55 km',
    heroImage: '/assets/images/segway_kickscooter_urban_1790783155728.jpg',
    bannerHeadline: 'Di chuyển thông minh, làm chủ nhịp sống thành phố',
    keyHighlights: [
      'Hệ thống chống trượt TCS (Traction Control System)',
      'Phuộc nhún lò xo bánh trước triệt tiêu rung chấn',
      'Đèn pha LED 2.1W độ sáng cao chiếu xa 13.5m',
      'Gấp gọn nhanh chóng chỉ 3 giây, trọng lượng chỉ 18.5kg'
    ]
  },
  {
    id: 'e',
    name: 'E Series',
    badge: 'Gọn Nhẹ & Thực Dụng',
    tagline: 'Khởi đầu hoàn hảo cho hành trình di chuyển xanh',
    description: 'Dòng xe kickscooter gọn nhẹ nhất với màn hình màu kích thước lớn 2.8 inch, lốp cao su rỗng đệm khí không bao giờ bị xịt lốp và chi phí bảo dưỡng gần như bằng không.',
    speedRange: 'Lên tới 25 km/h',
    rangeAvg: 'Quãng đường tới 35 km',
    heroImage: '/assets/images/segway_e_series_1790784144975.jpg',
    bannerHeadline: 'Đơn giản, tinh tế và không lo thủng lốp',
    keyHighlights: [
      'Màn hình hiển thị kỹ thuật số 2.8 inch góc nhìn siêu rộng',
      'Lốp rỗng hấp thụ xung chấn 8.1 inch không cần bơm hơi',
      'Hệ thống phanh đôi cơ và điện tử an toàn',
      'Trọng lượng siêu nhẹ chỉ 14.4kg dễ dàng xách lên cầu thang'
    ]
  },
  {
    id: 'c-zing',
    name: 'C & Zing Series',
    badge: 'Trẻ Em & Thanh Thiếu Niên',
    tagline: 'Thế hệ trẻ năng động, an toàn tối đa và đèn LED rực rỡ',
    description: 'Thiết kế chuyên biệt dành riêng cho trẻ em và thiếu niên. Trang bị hệ thống đèn LED RGB gầm xe đổi màu theo giai điệu, giới hạn tốc độ an toàn theo từng độ tuổi và tay lái tùy chỉnh độ cao.',
    speedRange: 'Lên tới 20 km/h',
    rangeAvg: 'Quãng đường 10 - 17 km',
    heroImage: '/assets/images/segway_gokart_racing_1790783138596.jpg',
    bannerHeadline: 'Món quà tuyệt vời nuôi dưỡng tinh thần khám phá',
    keyHighlights: [
      'Đèn LED RGB gầm xe với nhiều hiệu ứng phát sáng',
      'Giới hạn 3 chế độ lái: An toàn (10km/h), Thường (15km/h), Thể thao (20km/h)',
      'Khung xe chịu lực chắc chắn, tay lái điều chỉnh 3 nấc độ cao',
      'Tích hợp loa Bluetooth phát nhạc yêu thích khi di chuyển'
    ]
  }
];
