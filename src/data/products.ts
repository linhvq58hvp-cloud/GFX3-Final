import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. FLAGSHIP: GoFold X3
  {
    id: 'gofold-x3',
    name: 'Gofold Scooter X3',
    series: 'GoFold X3',
    scooterSeries: 'x3',
    category: 'kickscooter',
    tagline: 'Xe điện gấp thông minh: Động cơ cực đại 450W, Pin Lithium 36V 8Ah, Lốp đặc tổ ong chống nổ 8.5", Phanh kép E-ABS & Đĩa thép cacbon',
    description: `GoFold Scooter X3 Khung hợp kim nhôm siêu nhẹ, bền bỉ với tải trọng tới 120kg. Động cơ 450W mạnh mẽ, tốc độ 25 km/h và leo dốc 20% dễ dàng. Pin Lithium 36V 8Ah cho quãng đường di chuyển lên đến 30 km/lần sạc. An toàn tối đa với phanh đĩa, E-ABS, chống nước IPX5 và App thông minh.`,
    price: 4199999,
    originalPrice: 4990000,
    inStock: true,
    isFlagship: true,
    warrantyMonths: 6,
    image: '/assets/aistudio/18_770d0158.jpg',
    heroImage: '/assets/aistudio/18_770d0158.jpg',
    galleryImages: [
      '/assets/aistudio/18_770d0158.jpg',
      '/assets/aistudio/41_6aa6ef2d.jpg',
      '/assets/aistudio/38_2c6158ae.jpg',
      '/assets/aistudio/25_1c0a837d.jpg',
      '/assets/aistudio/42_05c73bb1.jpg',
      '/assets/aistudio/36_4e4fdd4e.jpg',
      '/assets/aistudio/35_4c316319.jpg'
    ],
    colors: [],
    hotspots: [
      { id: 'motor', title: 'Động cơ cực đại 450W', description: 'Động cơ không chổi than mạnh mẽ.', x: 75, y: 72 },
      { id: 'brakes', title: 'Phanh đĩa sau + E-ABS', description: 'Hệ thống phanh kép an toàn.', x: 30, y: 65 },
      { id: 'tire', title: 'Lốp 8.5 inch', description: 'Lốp êm ái, bám đường tốt.', x: 22, y: 80 },
      { id: 'fold', title: 'Thiết kế gập thông minh', description: 'Cơ chế gập nhanh gọn.', x: 40, y: 45 }
    ],
    specs: {
      topSpeed: 25,
      range: 30,
      motorPower: 450,
      motorType: 'Động cơ không chổi than',
      batteryCapacity: 'Lithium 36V 8Ah',
      chargingTime: '4 - 5 giờ',
      weight: 11,
      maxPayload: 120,
      waterResistance: 'IPX5',
      brakeSystem: 'Phanh đĩa sau + Phanh điện tử E-ABS trước',
      tireSize: '8.5 inch (Cao su không săm)',
      climbingAngle: 20,
      smartFeatures: [
        'Kết nối App thông minh điều khiển qua Bluetooth',
        'Màn hình LED kỹ thuật số hiển thị đầy đủ thông số',
        'Hệ thống quản lý pin thông minh (BMS) an toàn'
      ]
    },
    targetRider: 'Đi làm đô thị, sinh viên, bỏ cốp xe ô tô'
  }
];
