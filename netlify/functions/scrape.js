const puppeteer = require('puppeteer');

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

    // Launch browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Navigate to URL
    await page.goto(url, { waitUntil: 'networkidle0' });

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
