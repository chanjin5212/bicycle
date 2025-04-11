/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: '/bicycle/',
  basePath: '/bicycle',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig