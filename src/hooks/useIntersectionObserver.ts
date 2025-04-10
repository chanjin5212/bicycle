import { useState, useEffect, RefObject } from 'react';

type UseIntersectionObserverOptions = {
  threshold?: number;
  rootMargin?: string;
  unobserveOnIntersect?: boolean;
};

/**
 * IntersectionObserver를 쉽게 사용할 수 있는 커스텀 훅
 * @param elementRef 관찰할 요소의 ref
 * @param options IntersectionObserver 옵션 및 추가 옵션
 * @returns 요소가 화면에 보이는지 여부
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element | null>, // null도 허용하도록 변경
  {
    threshold = 0.1,
    rootMargin = '0px',
    unobserveOnIntersect = false
  }: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // 한 번만 관찰하고 싶을 때 (예: 애니메이션을 한 번만 실행)
        if (entry.isIntersecting && unobserveOnIntersect && elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, threshold, rootMargin, unobserveOnIntersect]);

  return isIntersecting;
}