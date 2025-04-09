/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router 사용 시 주의
  output: 'standalone', // 스탠드얼론 모드로 변경
  
  // 동적 이미지 처리 설정
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },

  // 빌드 시 정적 파라미터 생성 관련 설정
  experimental: {
    // 필요한 경우 추가 설정
    // serverActions: true
  }
};

module.exports = nextConfig;