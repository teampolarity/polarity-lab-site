/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Serve static index.html at root
        {
          source: '/',
          destination: '/index.html',
        },
      ],
    }
  },
}

module.exports = nextConfig
