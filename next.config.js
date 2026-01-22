/** @type {import('next').NextConfig} */

// Domain cấu hình tập trung - chỉ cần thay đổi ở đây
const REDIRECT_DOMAIN = 'https://topnews.livextop.com';
// const REDIRECT_DOMAIN = 'https://topnews.livextop.com';

const nextConfig = {
  reactStrictMode: true,

  // Use SWC for faster minification
  swcMinify: true,

  // Enable compression
  compress: true,

  // Optimized cache control headers
  async headers() {
    return [
      // Static assets (images, fonts, etc) - Cache 1 year, immutable
      {
        source: '/:path*\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // HTML pages and dynamic content - Short browser cache, longer CDN cache
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Redirects at CDN level - FREE, no middleware invocation costs!
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            // Only redirect if NOT Facebook crawler
            value: '(?!.*(facebook|facebookexternalhit)).*',
          },
        ],
        destination: `${REDIRECT_DOMAIN}/:path*`,
        permanent: true, // 301 for better SEO and caching
      },
    ];
  },
}

module.exports = nextConfig

