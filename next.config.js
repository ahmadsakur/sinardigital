/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ibanez.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'images.genius.com',
      },
      {
        protocol: 'https',
        hostname: 'metalanarchydotcom.files.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: 'vz.cnwimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
}

module.exports = nextConfig
