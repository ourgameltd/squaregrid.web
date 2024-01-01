/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig =  {
  i18n,
  trailingSlash: false,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: false
};

module.exports = nextConfig;
