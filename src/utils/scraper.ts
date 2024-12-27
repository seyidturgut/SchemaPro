import { SchemaData } from '../types/Schema';
import { normalizeScrapedData } from './dataNormalizer';

export async function scrapeUrl(url: string): Promise<SchemaData> {
  try {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API geçersiz yanıt döndürdü');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return normalizeScrapedData(data, url);
  } catch (error) {
    console.error('Scraping error:', error);
    if (error instanceof Error) {
      throw new Error(`URL bilgileri alınamadı: ${error.message}`);
    }
    throw new Error('URL bilgileri alınamadı. Lütfen geçerli bir URL girdiğinizden emin olun.');
  }
}