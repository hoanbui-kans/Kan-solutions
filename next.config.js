/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['kanbox.vn'],
  },
  serverRuntimeConfig: {
    baseUrl: {
      home: 1584,
      aboutus: 1568
    }
  }
}

module.exports = nextConfig
