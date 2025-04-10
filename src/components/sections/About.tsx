'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const About = () => {
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 pt-24 bg-gray-50 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">소개</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">환경을 생각하는 미래지향적 솔루션</h3>
            <p className="text-gray-600 mb-6">
              저희는 지속 가능한 환경을 위해 혁신적인 솔루션을 제공합니다. 자원 재활용과 
              친환경 프로세스를 통해 지구와 미래 세대를 위한 노력을 지속하고 있습니다.
            </p>
            <p className="text-gray-600 mb-6">
              2010년 설립 이후, 저희는 환경 보호와 지속 가능한 비즈니스 운영의 
              균형을 이루는 데 초점을 맞추고 있습니다.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src="/about-image.jpg"
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;