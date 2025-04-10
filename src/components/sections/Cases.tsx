'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Cases = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: '대형 오피스 빌딩 재활용 프로젝트',
      description: '서울 강남구의 대형 오피스 빌딩을 위한 맞춤형 재활용 시스템을 구축했습니다.',
      year: '2023년 완료',
      image: '/bicycle/case1.jpg',
      delay: '100ms'
    },
    {
      id: 2,
      title: '주거단지 친환경 수거 솔루션',
      description: '500세대 규모의 아파트 단지를 위한 효율적인 분리수거 시스템을 설계했습니다.',
      year: '2024년 완료',
      image: '/case2.jpg',
      delay: '200ms'
    },
    {
      id: 3,
      title: '공장 폐기물 관리 최적화',
      description: '제조 공장의 폐기물 처리 프로세스를 개선하여 30% 비용 절감을 달성했습니다.',
      year: '2023년 완료',
      image: '/case3.jpg',
      delay: '300ms'
    }
  ];

  return (
    <section 
      id="cases" 
      ref={sectionRef}
      className={`py-20 pt-24 bg-white transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">작업사례</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy) => (
            <Card 
              key={caseStudy.id}
              className={`overflow-hidden transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} 
              style={{ transitionDelay: caseStudy.delay }}
            >
              <div className="relative h-48">
                <Image 
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                <p className="text-sm text-emerald-600">{caseStudy.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;