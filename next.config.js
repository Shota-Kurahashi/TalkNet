const { withSuperjson } = require("next-superjson");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withSuperjson()(nextConfig);
