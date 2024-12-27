const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let browser = null;
  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    // Launch browser with Netlify's Chrome binary
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    
    // Set a longer timeout for navigation
    page.setDefaultNavigationTimeout(30000);
    
    // Set user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Block unnecessary resources to speed up loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font' || resourceType === 'media') {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Navigate to URL with timeout and wait options
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });

    // Wait for content to be available
    await page.waitForSelector('h1, title, meta[name="description"], article, .content, main', {
      timeout: 5000
    }).catch(() => console.log('Some selectors not found, continuing anyway'));

    // Extract data
    const data = await page.evaluate(() => {
      const getMetaContent = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.content : '';
      };

      const getTextContent = (selectors) => {
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            return element.textContent.trim();
          }
        }
        return '';
      };

      const title = getTextContent(['h1', 'title']) || document.title;
      const description = getMetaContent('meta[name="description"]') || 
                         getMetaContent('meta[property="og:description"]');
      const image = getMetaContent('meta[property="og:image"]') ||
                   document.querySelector('article img, .content img, main img')?.src;
      const datePublished = getMetaContent('meta[property="article:published_time"]') ||
                           document.querySelector('time')?.dateTime;
      const dateModified = getMetaContent('meta[property="article:modified_time"]');
      const content = getTextContent(['article', '.content', 'main', '#content', '.entry-content']);

      return {
        title,
        description,
        image,
        datePublished,
        dateModified,
        content,
      };
    });

    await browser.close();
    browser = null;

    // Validate and clean the response
    const cleanData = {
      title: data.title || '',
      description: data.description || '',
      image: data.image || '',
      datePublished: data.datePublished || '',
      dateModified: data.dateModified || '',
      content: data.content || '',
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(cleanData),
    };
  } catch (error) {
    console.error('Scraping error:', error);
    if (browser) {
      await browser.close();
    }
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
