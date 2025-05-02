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
  // Añadir configuración para manejar errores 404
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/not-found',
        permanent: false,
        missing: [
          {
            type: 'page',
            value: 'not-found',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
