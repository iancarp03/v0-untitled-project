/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['i.imgur.com', 'imgur.com', 'res.cloudinary.com'],
    unoptimized: true,
  },
  // Eliminamos la configuración de redirects que estaba causando el error
};

export default nextConfig;
