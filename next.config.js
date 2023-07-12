/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
    appDir: true,
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

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
