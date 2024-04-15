const fs = require('fs');
const { SitemapStream } = require('sitemap');

const pages = [
    { url: 'https://ardaa-tr.web.app/', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/BookDb', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/Contact', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/Profile', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/Admin', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/GelenMesajlar', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/Copyright', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/PrivacyPolicy', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://ardaa-tr.web.app/toInform', lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },


];

async function generateSitemap() {
    try {
        const smStream = new SitemapStream({ hostname: 'https://ardaa-tr.web.app/' });
        const writeStream = fs.createWriteStream('sitemap.xml');
  
        pages.forEach((page) => {
            smStream.write({ url: page.url, changefreq: page.changefreq, priority: page.priority });
        });
  
        smStream.end();
  
        smStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('Sitemap oluşturuldu.');
        });
    } catch (error) {
        console.error(error);
    }
}

generateSitemap();

module.exports = generateSitemap; 
