/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  // Ensure we're using the App Router
  useFileSystemPublicRoutes: true,
  // Add any other necessary configurations
  reactStrictMode: true,
};

module.exports = nextConfig; 