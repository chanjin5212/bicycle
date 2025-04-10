'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const Hero = () => {
  const [showPopup, setShowPopup] = useState(true);
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[800px] w-full">
      <Image
        src="/background.png"
        alt="Background Image"
        fill
        priority
        className="object-cover object-center brightness-75"
      />
      
      {/* 텍스트 오버레이 */}
      <div className="absolute inset-0 flex items-center px-10 md:px-20">
        {/* 왼쪽 텍스트 */}
        <div className="text-white max-w-xl z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Let&apos;s work together</h1>
          <p className="text-xl mb-6">함께 더 나은 환경을 만들어 나가요</p>
        </div>
      </div>
      
      {/* 플로팅 팝업 박스 - 모바일에서 중앙 정렬 */}
      {showPopup && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-sm w-[90%] md:w-auto md:max-w-sm md:left-auto md:right-10 md:translate-x-0 z-20 backdrop-blur-sm bg-opacity-95">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">폐자전거 수거 안내문</h2>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="닫기"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            폐자전거를 수거해 분류 작업 등을 통해 인천항에서 아프리카 등지로 수출됩니다.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            단지 내 골치 덩어리 폐자전거를 처리하세요!
          </p>
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 hover:text-white cursor-pointer transition-colors"
            onClick={scrollToContact}
          >
            수거문의
          </Button>
        </div>
      )}
    </div>
  );
};

export default Hero;