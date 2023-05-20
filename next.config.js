const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/page',
        destination: '/',
        permanent: true,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thedogapi.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
