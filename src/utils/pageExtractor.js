function extractPageData({ META_SELECTORS, WP_SELECTORS }) {
  const getMetaContent = (selector) => {
    const meta = document.querySelector(selector);
    return meta ? meta.getAttribute('content') : '';
  };

  // Find featured image
  const wpFeatured = document.querySelector(WP_SELECTORS.FEATURED_IMAGE)?.getAttribute('src');
  const ogImage = getMetaContent(META_SELECTORS.OPEN_GRAPH);
  const twitterImage = getMetaContent(META_SELECTORS.TWITTER);
  const articleImage = getMetaContent(META_SELECTORS.ARTICLE);

  // Find main content
  let articleBody = '';
  for (const selector of WP_SELECTORS.CONTENT) {
    const element = document.querySelector(selector);
    if (element) {
      articleBody = element.textContent.trim();
      break;
    }
  }

  return {
    title: document.title,
    description: getMetaContent(META_SELECTORS.DESCRIPTION),
    image: wpFeatured || ogImage || twitterImage || articleImage,
    articleBody,
    datePublished: getMetaContent(META_SELECTORS.PUBLISHED_DATE),
    dateModified: getMetaContent(META_SELECTORS.MODIFIED_DATE)
  };
}