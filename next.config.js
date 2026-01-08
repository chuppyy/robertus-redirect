/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Use SWC for faster minification
  swcMinify: true,

  // Enable compression
  compress: true,

  // Optimize images
  images: {
    domains: ['topnewsus.feji.io', 'topnews.livextop.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Add cache control headers for static assets
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
