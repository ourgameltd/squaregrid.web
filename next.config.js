/** @type {import('next').NextConfig} */
const nextConfig =  {
    output: "export",
    swcMinify: true,
    images: {
      unoptimized: true
    },
    reactStrictMode: false
  };

module.exports = nextConfig;
