export const WP_SELECTORS = {
  TITLE: [
    'h1.entry-title',
    'h1.post-title',
    'h1',
  ],
  DESCRIPTION: [
    'meta[name="description"]',
    'meta[property="og:description"]',
  ],
  CONTENT: [
    '.content-area',
    '.entry-content',
    'article',
    '.post-content',
    '.article-content',
    '.main-content',
    'main',
    '#main',
    '.content'
  ],
  CATEGORIES: [
    '.cat-links a',
    '.category-links a',
    '.post-categories a',
  ],
  DATE_PUBLISHED: [
    'meta[property="article:published_time"]',
    'time.entry-date',
    '.published',
  ],
  DATE_MODIFIED: [
    'meta[property="article:modified_time"]',
    'time.updated',
    '.modified',
  ],
  IMAGE: [
    'meta[property="og:image"]',
    '.post-thumbnail img',
    '.featured-image img',
    'article img',
  ]
};

export const META_SELECTORS = {
  DESCRIPTION: 'meta[name="description"]',
  OPEN_GRAPH: 'meta[property="og:image"]',
  TWITTER: 'meta[name="twitter:image"]',
  ARTICLE: 'meta[property="article:image"]',
  PUBLISHED_DATE: [
    'meta[property="article:published_time"]',
    'meta[property="og:updated_time"]',
    'time.entry-date'
  ],
  MODIFIED_DATE: [
    'meta[property="article:modified_time"]',
    'meta[property="og:updated_time"]',
    'time.updated'
  ],
  AUTHOR: 'meta[name="author"]',
  KEYWORDS: 'meta[name="keywords"]'
};
