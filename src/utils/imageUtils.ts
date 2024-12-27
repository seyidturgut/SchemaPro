import { META_SELECTORS, WP_SELECTORS } from './selectors';

export function findMainImage(document: Document): string {
  // 1. WordPress featured image
  const wpFeatured = document.querySelector(WP_SELECTORS.FEATURED_IMAGE)?.getAttribute('src');
  if (wpFeatured) return wpFeatured;

  // 2. Meta tags
  const metaImage = findMetaImage(document);
  if (metaImage) return metaImage;

  // 3. Content images
  const contentImage = findContentImage(document);
  if (contentImage) return contentImage;

  // 4. Fallback
  return 'https://romatem.com/images/logo.svg';
}

function findMetaImage(document: Document): string | null {
  const selectors = [
    META_SELECTORS.OPEN_GRAPH,
    META_SELECTORS.TWITTER,
    META_SELECTORS.ARTICLE
  ];

  for (const selector of selectors) {
    const meta = document.querySelector(selector);
    const content = meta?.getAttribute('content');
    if (content) return content;
  }

  return null;
}

function findContentImage(document: Document): string | null {
  for (const selector of WP_SELECTORS.CONTENT) {
    const container = document.querySelector(selector);
    if (!container) continue;

    const img = container.querySelector('img');
    const src = img?.getAttribute('src');
    if (src) return src;
  }

  return null;
}