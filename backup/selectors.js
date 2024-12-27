export const WP_SELECTORS = {
  FEATURED_IMAGE: '.post-featured-image img, .post-featured-image source',
  CONTENT: [
    '.entry-content',
    '.post-content',
    '.service-content',
    '.treatment-content',
    'article .content',
    '#post-content'
  ],
  AUTHOR: '.author-name, .post-author, .doctor-name',
  CATEGORIES: '.cat-links a, .post-categories a, .treatment-category',
  TREATMENT_INFO: {
    DOCTORS: '.treatment-doctors .doctor-name',
    DURATION: '.treatment-duration',
    PROCEDURE: '.treatment-procedure'
  }
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
