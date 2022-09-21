/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL || 'https://kansite.com.vn',
    generateRobotsTxt: true, // (optional)
    exclude: [
      '/quan-ly', 
    ],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
        {
          userAgent: 'black-listed-bot',
          disallow: ['/quan-ly'],
        },
      ],
      additionalSitemaps: [
        'https://kansite.com.vn/server-sitemap-index.xml',
      ],
    },
}

module.exports = config