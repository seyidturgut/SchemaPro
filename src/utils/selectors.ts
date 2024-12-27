// Meta tag selectors
export const META_SELECTORS = {
  OPEN_GRAPH: 'meta[property="og:image"]',
  TWITTER: 'meta[name="twitter:image"]',
  ARTICLE: 'meta[property="article:image"]',
  DESCRIPTION: 'meta[name="description"], meta[property="og:description"]',
  PUBLISHED_DATE: 'meta[property="article:published_time"]',
  MODIFIED_DATE: 'meta[property="article:modified_time"]'
};

// WordPress specific selectors
export const WP_SELECTORS = {
  FEATURED_IMAGE: '.wp-post-image',
  CONTENT: [
    '.entry-content',
    '.post-content',
    'article',
    '.article-content',
    '.content-area',
    'main'
  ]
};