'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 섹션 ID 타입 정의
type SectionId = "about" | "cases" | "quote" | "contact";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId | "">("");
  const isScrollingRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 스크롤 위치에 따라 활성 섹션 업데이트
  const handleScroll = () => {
    // 프로그래매틱 스크롤 중에는 스크롤 이벤트 무시
    if (isScrollingRef.current) return;
    
    const sections: SectionId[] = ["about", "cases", "quote", "contact"];
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section);
          break;
        }
      }
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 로드 시 실행
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 링크 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = (sectionId: SectionId) => {
    // 이미 스크롤 중이면 무시
    if (isScrollingRef.current) return;
    
    // 즉시 활성 섹션 업데이트
    setActiveSection(sectionId);
    
    // 스크롤 중 플래그 활성화 - 스크롤 이벤트 처리 중지
    isScrollingRef.current = true;
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Navbar 높이를 고려하여 스크롤 위치 조정
      const navbarHeight = 64 + 16;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      // 스크롤 이동
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
      
      // 스크롤 애니메이션 완료 후 스크롤 이벤트 다시 활성화 (1.2초 후)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200); // 스크롤 애니메이션 시간보다 조금 더 길게 설정
    }
  };
  
  return (
    <nav className="border-b fixed w-full top-0 bg-white z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-extrabold text-xl tracking-tight">미래환경</Link>
        
        {/* 중앙 정렬된 메뉴 */}
        <div className="flex-1 flex justify-center items-center space-x-10">
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className={`relative hover:text-lime-500 transition-colors py-1 ${
              activeSection === "about" ? "font-bold" : "font-normal"
            }`}
          >
            <span>소개</span>
            {activeSection === "about" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-500"></span>
            )}
          </a>
          <a 
            href="#cases" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("cases");
            }}
            className={`relative hover:text-lime-500 transition-colors py-1 ${
              activeSection === "cases" ? "font-bold" : "font-normal"
            }`}
          >
            <span>작업사례</span>
            {activeSection === "cases" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-500"></span>
            )}
          </a>
          <a 
            href="#quote" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("quote");
            }}
            className={`relative hover:text-lime-500 transition-colors py-1 ${
              activeSection === "quote" ? "font-bold" : "font-normal"
            }`}
          >
            <span>견적서</span>
            {activeSection === "quote" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-500"></span>
            )}
          </a>
        </div>
        
        {/* 오른쪽 버튼 */}
        <div>
          <Button 
            onClick={() => scrollToSection("contact")}
            className={`transform active:scale-95 transition-all cursor-pointer ${
              activeSection === "contact" 
                ? "bg-lime-600 hover:bg-lime-700 hover:text-white" 
                : "bg-emerald-500 hover:bg-emerald-600 hover:text-white"
            }`}
          >
            수거문의
          </Button>
        </div>
      </div>
    </nav>
  );
}