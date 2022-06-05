/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['kanbox.vn'],
  },
  env: {
    wp_json_enpoint: 'https://kanbox.vn/wp-json/',
  },
}

module.exports = nextConfig
