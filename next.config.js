/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/support',
        destination: 'https://github.com/AvaterClasher/nextron/issues/new',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
