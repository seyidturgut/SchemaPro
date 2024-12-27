const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    // Launch browser with Netlify's Chrome binary
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    // Set user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Navigate to URL with timeout
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 15000 
    });

    // Extract data
    const data = await page.evaluate(() => {
      const getMetaContent = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.content : '';
      };

      const title = document.querySelector('h1')?.innerText || document.title;
      const description = getMetaContent('meta[name="description"]') || 
                         getMetaContent('meta[property="og:description"]');
      const image = getMetaContent('meta[property="og:image"]') ||
                   document.querySelector('article img')?.src;
      const datePublished = getMetaContent('meta[property="article:published_time"]') ||
                           document.querySelector('time')?.dateTime;
      const dateModified = getMetaContent('meta[property="article:modified_time"]');
      const content = document.querySelector('article')?.innerText ||
                     document.querySelector('.content')?.innerText ||
                     document.querySelector('main')?.innerText;

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
