/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Añade esta configuración para evitar problemas con el caché
    config.cache = false;
    return config;
  },
}

module.exports = nextConfig

