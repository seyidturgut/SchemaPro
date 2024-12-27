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

  export async function scrapeUrl(url) {
    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // JavaScript'i aktif et
      await page.setJavaScriptEnabled(true);
      
      // Sayfayı yükle
      await page.goto(url, { 
        waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
        timeout: 30000
      });
      
      // Sayfanın tam yüklenmesi için bekle
      await page.waitForTimeout(5000);

      const data = await page.evaluate(() => {
        // Title
        const title = document.querySelector('h1')?.textContent?.trim() || '';
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
        const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        const datePublished = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content') || '';
        const dateModified = document.querySelector('meta[property="article:modified_time"]')?.getAttribute('content') || '';

        // Article Body - Ana içerik alanını bul
        let articleBody = '';
        
        // 1. Ana içerik alanını bul
        const mainContent = document.querySelector('.elementor-widget-theme-post-content');
        console.log('Main content found:', !!mainContent);
        
        if (mainContent) {
          // 2. İçerik widget'larını bul
          const contentWidgets = mainContent.querySelectorAll('.elementor-widget-container');
          console.log('Content widgets found:', contentWidgets.length);
          
          // 3. Her widget içindeki metni topla
          contentWidgets.forEach(widget => {
            // Paragraf, başlık ve liste öğelerini bul
            const textElements = widget.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
            
            textElements.forEach(el => {
              const text = el.textContent.trim();
              if (text) {
                console.log('Found text:', text.substring(0, 50));
                articleBody += text + ' ';
              }
            });
          });
        }
        
        // Eğer ana içerik bulunamazsa, alternatif yöntem dene
        if (!articleBody) {
          console.log('Trying alternative method...');
          // Tüm section'ları bul
          const sections = document.querySelectorAll('.elementor-section-wrap > .elementor-section');
          console.log('Sections found:', sections.length);
          
          sections.forEach((section, index) => {
            console.log(`Processing section ${index + 1}`);
            
            // Header/footer kontrolü
            const isHeader = section.closest('header') || section.closest('.site-header');
            const isFooter = section.closest('footer') || section.closest('.site-footer');
            const isNavigation = section.closest('nav');
            
            if (!isHeader && !isFooter && !isNavigation) {
              // İçerik widget'larını bul
              const widgets = section.querySelectorAll('.elementor-widget-container');
              
              widgets.forEach(widget => {
                const textElements = widget.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, .elementor-text-editor');
                
                textElements.forEach(el => {
                  const text = el.textContent.trim();
                  if (text) {
                    console.log('Found text in section:', text.substring(0, 50));
                    articleBody += text + ' ';
                  }
                });
              });
            }
          });
        }

        console.log('Final article body length:', articleBody.length);
        console.log('Article body preview:', articleBody.substring(0, 200));

        return {
          url,
          title,
          description,
          image,
          datePublished,
          dateModified,
          articleBody: articleBody.replace(/\s+/g, ' ').trim()
        };
      });

      await browser.close();
      return data;

    } catch (error) {
      console.error('Error scraping URL:', error);
      throw new Error('URL scraping failed');
    }
  }

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