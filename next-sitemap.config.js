/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fudawake.vercel.app",
  generateRobotsTxt: true, // robots.txtも生成
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://fudawake.vercel.app/sitemap.xml",
    ],
  },
};
