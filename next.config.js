const nextConfig =  {
  trailingSlash: false,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: false,
  output: 'export'
};

module.exports = nextConfig;
