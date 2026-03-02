/** @type {import('next').NextConfig} */
const nextConfig = {
  // Variables de entorno se manejan directamente en los archivos que las necesitan
  // NO se exponen al cliente a través de env:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
