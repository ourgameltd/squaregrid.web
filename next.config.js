/** @type {import('next').NextConfig} */
const nextConfig =  {
  i18n: {
    locales: ['default', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: false
};

module.exports = nextConfig;
