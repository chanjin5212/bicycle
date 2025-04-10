'use client';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Cases from '@/components/sections/Cases';
import Quote from '@/components/sections/Quote';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative pt-16">
      {/* 히어로 섹션 */}
      <Hero />
      
      {/* 소개 섹션 */}
      <About />
      
      {/* 작업사례 섹션 */}
      <Cases />
      
      {/* 견적서 섹션 */}
      <Quote />
      
      {/* 수거문의 섹션 */}
      <Contact />
    </main>
  );
}