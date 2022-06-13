/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['kanbox.vn'],
  },
  env: {
    wp_json_enpoint: 'https://kanbox.vn/wp-json/',
    // Authenciations
    FACEBOOK_ID: '385466796942941',
    FACEBOOK_SECRET: '3093c41d651b2ede7dce87e5cf734c93',
    GOOGLE_ID: '18529781742-9p59hm5iucitk5mddpu9bie8unffuuh0.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    NEXTAUTH_URL: 'https://locahost:3000'
  },
}

module.exports = nextConfig
