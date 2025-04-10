'use client';

import { useEffect, useRef, useState } from 'react';

const Quote = () => {
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

  const quoteItems = [
    { id: 1, type: '디스크 방식(MTB)', price: '20,000', note: '굵은 타이어 기준, 26인치' },
    { id: 2, type: '알루미늄 바디(MTB)', price: '10,000', note: '굵은 타이어 기준, 26인치' },
    { id: 3, type: '일반 성인용(MTB)', price: '6,000', note: '굵은 타이어 기준, 26인치' },
    { id: 4, type: '미니 벨로', price: '5,000', note: '접이식 기준, 20인치' },
    { id: 5, type: '로드용 하이브리드', price: '2,000', note: '싸이클' },
    { id: 6, type: '아동용', price: '3,000', note: '유아용 제외' }
  ];

  const notes = [
    '*전체적으로 상태가 괜찮으면(녹이 적으면) 견적가보다 무조건 더 드립니다.',
    '*도로 사정이 좋지 않은 후진국 수출용입니다.',
    '바퀴가 가늘거나 작은 자전거는 잘 안나갑니다.',
    '녹이 많은 자전거는 폐기처분 됩니다.',
    '당사는 대규모 업체로써 많은 양도 하루면 처리 가능합니다.'
  ];

  return (
    <section 
      id="quote" 
      ref={sectionRef}
      className={`py-20 pt-24 bg-gray-50 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                {quoteItems.map(item => (
                  <tr key={item.id} className="border border-gray-300">
                    <td className="border border-gray-300 py-4 px-6 text-center">{item.type}</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">{item.price}</td>
                    <td className="border border-gray-300 py-4 px-6 text-center">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 space-y-2 text-gray-700">
            {notes.map((note, index) => (
              <p key={index}>{note}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;