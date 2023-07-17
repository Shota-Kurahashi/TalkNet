const { withSuperjson } = require("next-superjson");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "minio"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withSuperjson()(nextConfig);
