
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cbp/ui", "@cbp/core"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
