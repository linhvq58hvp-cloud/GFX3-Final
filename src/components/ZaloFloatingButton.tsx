import React from 'react';

export const ZaloFloatingButton: React.FC = () => {
  return (
    <a
      href="https://zalo.me/0942223434"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 bg-[#0068ff] rounded-full shadow-lg hover:bg-[#0052cc] transition-all duration-300 active:scale-95 touch-manipulation animate-bounce"
      title="Liên hệ Zalo"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Zalo_logo.png" 
        alt="Zalo" 
        className="h-8 w-8 object-contain"
      />
    </a>
  );
};
