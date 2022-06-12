/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['kanbox.vn'],
  },
  env: {
    wp_json_enpoint: 'https://kanbox.vn/wp-json/',
    // Authenciations
    FACEBOOK_ID: '349746127198220',
    FACEBOOK_SECRET: '17cfdea9e010e31859d238088cfa664a',
    GOOGLE_ID: '18529781742-9p59hm5iucitk5mddpu9bie8unffuuh0.apps.googleusercontent.com',
    GOOGLE_SECRET: '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'
  },
}

module.exports = nextConfig
