import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    unoptimized: true
  },
  
  // GitHub Pages 경로 설정
  basePath: '/bicycle',
  assetPrefix: '/bicycle',
  
  trailingSlash: true,
  
  // 빌드 시 공개 경로 재정의
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output = {
        ...config.output,
        publicPath: '/bicycle/_next/',
      };
    }
    return config;
  },

  // 정적 파일 내보내기 설정
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // 다른 정적 페이지 추가 가능
    };
  }
};

module.exports = nextConfig;