/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL || 'https://kansite.com.vn',
    generateRobotsTxt: true, // (optional)
}

export default config