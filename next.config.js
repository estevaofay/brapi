/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: false,
      },
      {
        source: '/sitemap',
        destination: '/api/sitemap',
        permanent: false,
      },
      {
        source: '/quotes/:stock',
        destination: '/quote/:stock',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
