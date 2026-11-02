import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Anh Tuấn', role: 'Văn phòng, Hà Nội', comment: 'Xe gấp gọn bỏ vừa khít cốp xe, đi làm rất tiện, lại còn thời trang nữa.', rating: 5 },
  { name: 'Chị Mai', role: 'Chung cư, TP.HCM', comment: 'Mua cho con đi học, xe nhẹ dễ mang lên thang máy. Rất ưng ý!', rating: 5 },
  { name: 'Anh Hùng', role: 'Freelancer', comment: 'Động cơ 450W leo dốc khỏe, đúng như quảng cáo.', rating: 4 },
];

const FAQS = [
  { q: 'Pin sạc bao lâu thì đầy?', a: 'Sạc đầy mất khoảng 4-5 giờ.' },
  { q: 'Xe có được bảo hành không?', a: 'Có, bảo hành chính hãng 6 tháng cho Pin và Động cơ.' },
  { q: 'Nếu hỏng hóc thì sửa ở đâu?', a: 'Hệ thống Showroom GOFOLD trên toàn quốc hỗ trợ bảo hành và sửa chữa.' },
  { q: 'Làm thế nào để đăng ký lái thử xe?', a: 'Bạn có thể nhấn vào nút "Đăng Ký Lái Thử" ngay trên trang web hoặc đến trực tiếp các Showroom của GOFOLD để trải nghiệm thực tế hoàn toàn miễn phí.' },
];

export const FeedbackAndFAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <section className="w-full py-16 bg-black border-t border-neutral-900">
      <div className="mx-auto max-w-4xl px-4">
        {/* Feedback Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">Khách hàng nói về GoFold X3</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <div className="flex gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-neutral-300 text-sm mb-4">"{rev.comment}"</p>
                <div className="font-bold text-white text-sm">{rev.name}</div>
                <div className="text-neutral-500 text-xs">{rev.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-bold text-white"
                >
                  {faq.q}
                  {openFAQ === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openFAQ === i && <div className="p-4 pt-0 text-sm text-neutral-400">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
