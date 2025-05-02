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
  // Asegurarse de que la aplicación se despliegue correctamente
  output: 'standalone',
};

export default nextConfig;
