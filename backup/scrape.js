import puppeteer from 'puppeteer';
import { META_SELECTORS, WP_SELECTORS } from '../src/utils/selectors.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes('romatem.com')) {
    return res.status(400).json({ error: 'Only Romatem.com URLs are allowed' });
  }

  const scrapeUrl = async (url) => {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Sayfa yüklenirken tüm kaynakların yüklenmesini bekle
      await page.setDefaultNavigationTimeout(30000);
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Elementor widget'larının yüklenmesini bekle
      await page.waitForSelector('.elementor-widget-container', { timeout: 5000 });

      // Debug: HTML içeriğini kontrol et
      const pageContent = await page.content();
      console.log('Page HTML:', pageContent);

      const data = await page.evaluate((selectors) => {
        const { META_SELECTORS, WP_SELECTORS } = selectors;
        
        const getMetaContent = (selector) => {
          const meta = document.querySelector(selector);
          return meta ? meta.getAttribute('content') : '';
        };

        const getWordPressDate = (type) => {
          const timeElement = document.querySelector(`.entry-${type} time`);
          if (timeElement) {
            return timeElement.getAttribute('datetime') || timeElement.textContent;
          }
          return '';
        };
    
        const getFeaturedImage = () => {
          // Debug: Elementor widget'ını kontrol et
          const widget = document.querySelector('[data-widget_type="theme-post-featured-image.default"]');
          console.log('Found widget:', widget?.outerHTML);

          // Elementor featured image widget'ını bul
          const featuredImageWidget = document.querySelector('[data-widget_type="theme-post-featured-image.default"]');
          if (featuredImageWidget) {
            const img = featuredImageWidget.querySelector('img');
            console.log('Found image in widget:', img?.outerHTML);
            
            if (img && img.src && !img.src.startsWith('data:')) {
              console.log('Using image from widget:', img.src);
              return img.src;
            }
          }

          // Alternatif yöntem: Direkt img elementini bul
          const directImg = document.querySelector('.elementor-widget-theme-post-featured-image img');
          if (directImg && directImg.src && !directImg.src.startsWith('data:')) {
            console.log('Using direct image:', directImg.src);
            return directImg.src;
          }

          // Son çare: Sayfadaki ilk büyük görseli bul
          const allImages = Array.from(document.querySelectorAll('img[src*="wp-content/uploads"]'))
            .filter(img => !img.src.startsWith('data:') && 
                          !img.src.includes('logo') && 
                          !img.src.includes('icon') &&
                          (img.naturalWidth > 300 || img.width > 300));

          if (allImages.length > 0) {
            console.log('Using first large image:', allImages[0].src);
            return allImages[0].src;
          }

          console.log('No valid image found');
          return null;
        };
    
        let articleBody = '';
        for (const selector of WP_SELECTORS.CONTENT) {
          const element = document.querySelector(selector);
          if (element) {
            articleBody = element.textContent.replace(/\\s+/g, ' ').trim();
            break;
          }
        }

        const categories = Array.from(document.querySelectorAll(WP_SELECTORS.CATEGORIES))
          .map(cat => cat.textContent.trim());
    
        const featuredImage = getFeaturedImage();
        console.log('Final selected image:', featuredImage);

        return {
          title: document.title.replace(' - Romatem', '').trim(),
          description: getMetaContent(META_SELECTORS.DESCRIPTION),
          image: featuredImage || 'https://romatem.com/wp-content/uploads/romatem-default-image.webp',
          articleBody,
          datePublished: getWordPressDate('date') || getMetaContent(META_SELECTORS.PUBLISHED_DATE),
          dateModified: getWordPressDate('modified') || getMetaContent(META_SELECTORS.MODIFIED_DATE),
          categories
        };
      }, { META_SELECTORS, WP_SELECTORS });

      return data;
    } catch (error) {
      console.error('Scraping error:', error);
      throw error;
    } finally {
      await browser.close();
    }
  };

  try {
    const data = await scrapeUrl(url);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({ 
      error: 'Failed to scrape URL',
      details: error.message 
    });
  }
}