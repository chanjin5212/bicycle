'use client';

import { ReactNode, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  bgColor?: 'white' | 'gray' | 'emerald';
  animationType?: 'fade-up' | 'fade-in' | 'scale';
  unobserveOnIntersect?: boolean;
};

/**
 * 애니메이션 효과가 있는 재사용 가능한 섹션 컴포넌트
 */
const Section = ({
  id,
  children,
  className = '',
  bgColor = 'white',
  animationType = 'fade-up',
  unobserveOnIntersect = false
}: SectionProps) => {
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, { unobserveOnIntersect });

  // 배경색 설정
  const getBgColorClass = () => {
    switch (bgColor) {
      case 'gray':
        return 'bg-gray-50';
      case 'emerald':
        return 'bg-emerald-600';
      case 'white':
      default:
        return 'bg-white';
    }
  };

  // 애니메이션 효과 설정
  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'fade-up':
          return 'opacity-0 translate-y-10';
        case 'fade-in':
          return 'opacity-0';
        case 'scale':
          return 'opacity-0 scale-95';
        default:
          return 'opacity-0';
      }
    }
    
    switch (animationType) {
      case 'fade-up':
        return 'opacity-100 translate-y-0';
      case 'fade-in':
        return 'opacity-100';
      case 'scale':
        return 'opacity-100 scale-100';
      default:
        return 'opacity-100';
    }
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 pt-24 transition-all duration-1000 ease-out ${getBgColorClass()} ${getAnimationClass()} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;