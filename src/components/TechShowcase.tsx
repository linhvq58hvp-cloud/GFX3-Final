import React from 'react';
import { Cpu, Battery, Smartphone, Shield, Activity, Sparkles } from 'lucide-react';

export const TechShowcase: React.FC = () => {
  return (
    <section id="tech" className="scroll-mt-20 border-t border-neutral-800 bg-neutral-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Nền Tảng Công Nghệ Đột Phá
          </div>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl" style={{ textWrap: 'balance' }}>
            Hệ Sinh Thái Kỹ Thuật Độc Quyền Segway & Ninebot
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Hơn 20 năm nghiên cứu thuật toán cân bằng động học và công nghệ tự hành vi mô. Mỗi chiếc xe Segway là sự kết tinh của phần cứng cơ khí hàng không và phần mềm điều khiển thông minh.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: BMS 2.0 */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 transition-colors hover:border-neutral-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <Battery className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              01. Smart BMS 2.0 Siêu Bền Bỉ
            </h3>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Hệ thống quản lý pin thông minh giám sát nhiệt độ từng cell pin theo thời gian thực. Tích hợp 10 lớp bảo vệ: chống quá nạp, quá nhiệt, đoản mạch và tự động tối ưu hóa chu kỳ xả sâu.
            </p>
            <div className="mt-6 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
              Tuổi thọ lên đến 1.000 chu kỳ nạp xả · Hiệu suất duy trì &gt;80%
            </div>
          </div>

          {/* Card 2: SDTC */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 transition-colors hover:border-neutral-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              02. Kiểm Soát Lực Kéo Động Học SDTC
            </h3>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Thuật toán Segway Dynamic Traction Control độc quyền tự động điều chỉnh mô-men xoắn giữa hai bánh xe trong 0.05 giây, ngăn ngừa trượt bánh khi di chuyển trên bề mặt ướt hoặc vào cua gấp.
            </p>
            <div className="mt-6 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
              Công nghệ ổn định điện tử tiêu chuẩn xe hơi thể thao
            </div>
          </div>

          {/* Card 3: RideyGo & AirLock */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 transition-colors hover:border-neutral-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              03. AirLock & Khóa Không Chìa RideyGo!
            </h3>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Tạm biệt chìa khóa cơ truyền thống. Xe tự động mở nguồn khi bạn đến gần với điện thoại trong túi, và tự động khóa bánh, kích hoạt còi chống trộm ngay khi bạn bước ra xa.
            </p>
            <div className="mt-6 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
              Tương thích Apple Find My & Cập nhật phần mềm qua OTA
            </div>
          </div>

          {/* Card 4: Aerospace Aluminium */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 transition-colors hover:border-neutral-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              04. Khung Hợp Kim Nhôm Hàng Không
            </h3>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Chế tác từ vật liệu nhôm series 6000 siêu bền thường được dùng trong thân máy bay. Chịu tải trọng tĩnh lên tới 700kg và vượt qua bài kiểm tra rung lắc 100.000 lần liên tục.
            </p>
            <div className="mt-6 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
              Chống ăn mòn muối biển IPX5/IPX7 tiêu chuẩn quốc tế
            </div>
          </div>

          {/* Card 5: Hydraulic Suspension */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 transition-colors hover:border-neutral-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              05. Phuộc Thủy Lực Đôi Tự Điều Chỉnh
            </h3>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Hệ thống treo tay đòn kép dạng phuộc nhún xe đua với van thủy lực tùy biến 15 nấc, triệt tiêu xung động từ mặt đường gồ ghề, cho cảm giác lái êm ái như trên thảm bay.
            </p>
            <div className="mt-6 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
              Hành trình giảm xóc lên tới 50mm trước và sau
            </div>
          </div>

          {/* Card 6: KERS Regenerative Braking */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 transition-colors hover:border-neutral-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              06. Tái Sinh Năng Lượng Phanh KERS
            </h3>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Mỗi lần bóp phanh hoặc thả dốc, động cơ lập tức chuyển thành máy phát, chuyển hóa động năng thành điện năng sạc ngược lại vào khối pin, tăng thêm 10-15% quãng đường di chuyển.
            </p>
            <div className="mt-6 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
              3 cấp độ thu hồi năng lượng điều khiển qua ứng dụng Segway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
