import React from 'react';
import { Video, Play } from 'lucide-react';

export const VideoReviewsSection: React.FC = () => {
  const video = {
    title: 'Review chi tiết xe điện gấp GoFold X3 mới nhất 2026',
    embedUrl: 'https://www.youtube-nocookie.com/embed/HL2uZB2vVVM?autoplay=0',
    thumbnail: '/images/x3/x3-main.jpg',
    description: 'Đánh giá chi tiết, thực tế mẫu xe điện gấp thông minh GoFold X3.'
  };

  return (
    <section id="video-reviews" className="w-full py-10 sm:py-16 bg-neutral-950 border-t border-neutral-900">
      <div className="mx-auto max-w-4xl px-3 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00a3ff] mb-2">
            <Video className="h-4 w-4" />
            <span>Video Review Thực Tế</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">
            Trải Nghiệm GoFold X3
          </h2>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-800 bg-black shadow-2xl shadow-cyan-950/20">
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        
        {/* Description */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold text-white">{video.title}</h3>
          <p className="text-sm text-neutral-400 mt-2">{video.description}</p>
        </div>
      </div>
    </section>
  );
};
