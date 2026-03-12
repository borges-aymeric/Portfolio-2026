/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Désactive complètement ESLint pendant les builds Next
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

