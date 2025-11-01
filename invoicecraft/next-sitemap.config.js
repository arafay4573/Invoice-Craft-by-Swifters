module.exports = {
  siteUrl: 'https://invoicecraft.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  transform: async (config, path) => {
    if (path.startsWith('/templates/')) {
      return null;
    }

    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/templates/receipt'),
    await config.transform(config, '/templates/quote'),
    await config.transform(config, '/templates/estimate'),
  ],
};
