'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

// 관찰자 객체의 타입을 명시적으로 정의
type ObserverEntry = {
  observer: IntersectionObserver;
  element: Element;
};

export default function Home() {
  // 반복 애니메이션을 위한 상태 관리
  const [aboutVisible, setAboutVisible] = useState(false);
  const [casesVisible, setCasesVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  
  // 각 섹션의 ref
  const aboutRef = useRef(null);
  const casesRef = useRef(null);
  const quoteRef = useRef(null);
  const contactRef = useRef(null);
  
  // 스크롤 관찰자 설정
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // 타입을 명시적으로 지정
    const observers: ObserverEntry[] = [];
    
    // 소개 섹션 관찰자
    const aboutObserver = new IntersectionObserver(([entry]) => {
      setAboutVisible(entry.isIntersecting);
    }, options);
    
    // 작업사례 섹션 관찰자
    const casesObserver = new IntersectionObserver(([entry]) => {
      setCasesVisible(entry.isIntersecting);
    }, options);
    
    // 견적서 섹션 관찰자
    const quoteObserver = new IntersectionObserver(([entry]) => {
      setQuoteVisible(entry.isIntersecting);
    }, options);
    
    // 연락처 섹션 관찰자 (한 번만 애니메이션)
    const contactObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setContactVisible(true);
        contactObserver.unobserve(entry.target);
      }
    }, options);
    
    // ref에 관찰자 연결
    if (aboutRef.current) {
      aboutObserver.observe(aboutRef.current);
      observers.push({ observer: aboutObserver, element: aboutRef.current });
    }
    
    if (casesRef.current) {
      casesObserver.observe(casesRef.current);
      observers.push({ observer: casesObserver, element: casesRef.current });
    }
    
    if (quoteRef.current) {
      quoteObserver.observe(quoteRef.current);
      observers.push({ observer: quoteObserver, element: quoteRef.current });
    }
    
    if (contactRef.current) {
      contactObserver.observe(contactRef.current);
      observers.push({ observer: contactObserver, element: contactRef.current });
    }
    
    // 정리 함수
    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <main className="relative pt-16">
      {/* 배경 이미지 섹션 (히어로 섹션) - 애니메이션 없음 */}
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
            <h2 className="text-xl font-bold mb-3">workflow를 도입하세요</h2>
            <p className="text-sm text-gray-600 mb-4">
              근태 및 업무관리, 업무평가 등 모든 업무를 한 곳에서 손쉽게 관리하세요.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              업무 생산성을 높이고 시간을 절약하세요!
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 hover:text-white cursor-pointer transition-colors">수거문의</Button>
          </div>
        </div>
      </div>

      {/* 소개 섹션 - 반복 애니메이션 */}
      <section 
        id="about" 
        ref={aboutRef}
        className={`py-20 pt-24 bg-gray-50 transition-all duration-1000 ease-out ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
              <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-50">
                더 알아보기
              </Button>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/about-image.jpg" // 소개 이미지를 public 폴더에 추가해야 합니다
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* 작업사례 섹션 - 반복 애니메이션 */}
      <section 
        id="cases" 
        ref={casesRef}
        className={`py-20 pt-24 bg-white transition-all duration-1000 ease-out ${
          casesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">작업사례</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 작업사례 카드 1 */}
            <Card className={`overflow-hidden transition-all duration-700 ease-out ${
              casesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '100ms' }}>
              <div className="relative h-48">
                <Image 
                  src="/bicycle/case1.jpg" // 작업사례 이미지를 public 폴더에 추가해야 합니다
                  alt="Case Study 1"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">대형 오피스 빌딩 재활용 프로젝트</h3>
                <p className="text-gray-600 mb-4">서울 강남구의 대형 오피스 빌딩을 위한 맞춤형 재활용 시스템을 구축했습니다.</p>
                <p className="text-sm text-emerald-600">2023년 완료</p>
              </CardContent>
            </Card>
            
            {/* 작업사례 카드 2 */}
            <Card className={`overflow-hidden transition-all duration-700 ease-out ${
              casesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="relative h-48">
                <Image 
                  src="/case2.jpg" // 작업사례 이미지를 public 폴더에 추가해야 합니다
                  alt="Case Study 2"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">주거단지 친환경 수거 솔루션</h3>
                <p className="text-gray-600 mb-4">500세대 규모의 아파트 단지를 위한 효율적인 분리수거 시스템을 설계했습니다.</p>
                <p className="text-sm text-emerald-600">2024년 완료</p>
              </CardContent>
            </Card>
            
            {/* 작업사례 카드 3 */}
            <Card className={`overflow-hidden transition-all duration-700 ease-out ${
              casesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="relative h-48">
                <Image 
                  src="/case3.jpg" // 작업사례 이미지를 public 폴더에 추가해야 합니다
                  alt="Case Study 3"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">공장 폐기물 관리 최적화</h3>
                <p className="text-gray-600 mb-4">제조 공장의 폐기물 처리 프로세스를 개선하여 30% 비용 절감을 달성했습니다.</p>
                <p className="text-sm text-emerald-600">2023년 완료</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-50">
              더 많은 사례 보기
            </Button>
          </div>
        </div>
      </section>

      {/* 견적서 섹션 - 반복 애니메이션 */}
      <section 
        id="quote" 
        ref={quoteRef}
        className={`py-20 pt-24 bg-gray-50 transition-all duration-1000 ease-out ${
          quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">견적서</h2>
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border border-gray-300">
                    <th className="border border-gray-300 py-4 px-6 bg-gray-100 font-bold text-center">종류</th>
                    <th className="border border-gray-300 py-4 px-6 bg-gray-100 font-bold text-center">단가</th>
                    <th className="border border-gray-300 py-4 px-6 bg-gray-100 font-bold text-center">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">디스크 방식(MTB)</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">20,000</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">굵은 타이어 기준, 26인치</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">알루미늄 바디(MTB)</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">10,000</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">굵은 타이어 기준, 26인치</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">일반 성인용(MTB)</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">6,000</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">굵은 타이어 기준, 26인치</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">미니 벨로</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">5,000</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">접이식 기준, 20인치</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">로드용 하이브리드</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">2,000</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">싸이클</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">아동용</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">3,000</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">유아용 제외</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-2 text-gray-700">
              <p>*전체적으로 상태가 괜찮으면(녹이 적으면) 견적가보다 무조건 더 드립니다.</p>
              <p>*도로 사정이 좋지 않은 후진국 수출용입니다.</p>
              <p>바퀴가 가늘거나 작은 자전거는 잘 안나갑니다.</p>
              <p>녹이 많은 자전거는 폐기처분 됩니다.</p>
              <p>당사는 대규모 업체로써 많은 양도 하루면 처리 가능합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 수거문의 섹션 (양식 형태로 변경) */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`py-20 pt-24 bg-emerald-600 transition-all duration-1000 ease-out ${
          contactVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">수거문의</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">수거 서비스 문의</h3>
              <p className="text-gray-600 mb-8 text-center">
                수거 서비스에 대한 문의사항이 있으시면 아래 양식을 작성해주세요. 빠르게 답변 드리겠습니다.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">수거 요청 지역</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="예: 서울시 강남구" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">수거 품목</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>일반 생활 폐기물</option>
                    <option>재활용 폐기물</option>
                    <option>대형 폐기물</option>
                    <option>사업장 폐기물</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">추가 요청사항</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-md h-32"></textarea>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 hover:text-white">문의하기</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}