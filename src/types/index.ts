export type CategoryId = 'all' | 'superscooter' | 'kickscooter' | 'emoped' | 'gokart' | 'accessories';

export type ScooterSeriesId = 'all' | 'x3' | 'x5' | 'zd-002' | 'gt' | 'max' | 'f' | 'e' | 'c-zing';

export interface VehicleColor {
  name: string;
  code: string;
  hex: string;
}

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export interface ProductSpec {
  topSpeed: number; // km/h
  range: number; // km
  motorPower: number; // Watts (peak or nominal)
  motorType: string;
  batteryCapacity?: string; // e.g. "1512 Wh"
  chargingTime: string; // e.g. "6h"
  weight: number; // kg
  maxPayload: number; // kg
  waterResistance: string; // e.g. "IPX5 toàn thân / IPX7 cụm pin"
  brakeSystem: string;
  tireSize: string;
  climbingAngle: number; // % or degrees
  smartFeatures: string[];
}

export interface BatteryOption {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface Product {
  id: string;
  name: string;
  series: string;
  scooterSeries?: ScooterSeriesId;
  category: CategoryId;
  tagline: string;
  description: string;
  price: number; // VNĐ
  originalPrice?: number;
  inStock: boolean;
  image: string;
  heroImage?: string;
  galleryImages: string[];
  colors: VehicleColor[];
  batteryOptions?: BatteryOption[];
  specs: ProductSpec;
  isFlagship?: boolean;
  warrantyMonths: number;
  hotspots?: Hotspot[];
  targetRider?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: VehicleColor;
  quantity: number;
}

export interface TestRideBooking {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  selectedVehicleId: string;
  selectedShowroom: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'pending';
}

export interface Order {
  orderId: string;
  items: CartItem[];
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    note?: string;
  };
  paymentMethod: 'vietqr' | 'cod' | 'installment';
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  createdAt: string;
}

export interface Showroom {
  id: string;
  name: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Đà Nẵng';
  address: string;
  phone: string;
  hours: string;
  latLng?: { lat: number; lng: number };
}

export interface ScooterSeriesInfo {
  id: ScooterSeriesId;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  speedRange: string;
  rangeAvg: string;
  heroImage: string;
  bannerHeadline: string;
  keyHighlights: string[];
}
