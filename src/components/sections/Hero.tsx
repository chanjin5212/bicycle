'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Hero = () => {
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
      
      {/* 텍스트 및 박스 오버레이 */}
      <div className="absolute inset-0 flex items-center justify-between px-10 md:px-20">
        {/* 왼쪽 텍스트 */}
        <div className="text-white max-w-xl z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Let&apos;s work together</h1>
          <p className="text-xl mb-6">함께 더 나은 환경을 만들어 나가요</p>
        </div>
        
        {/* 오른쪽 박스 */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm z-10">
          <h2 className="text-xl font-bold mb-3">폐자전거 수거 안내문</h2>
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
      </div>
    </div>
  );
};

export default Hero;