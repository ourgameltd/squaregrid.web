/** @type {import('next').NextConfig} */
const nextConfig =  {
  output: "standalone",
  swcMinify: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: false
};

module.exports = nextConfig;
