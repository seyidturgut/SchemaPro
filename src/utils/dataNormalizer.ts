import { SchemaData } from '../types/Schema';

export function normalizeScrapedData(data: Partial<SchemaData>, url: string): SchemaData {
  const now = new Date().toISOString();
  
  return {
    url,
    title: data.title || '',
    description: data.description || '',
    image: data.image || 'https://romatem.com/images/logo.svg',
    datePublished: data.datePublished || now,
    dateModified: data.dateModified || data.datePublished || now,
    articleBody: data.articleBody || ''
  };
}