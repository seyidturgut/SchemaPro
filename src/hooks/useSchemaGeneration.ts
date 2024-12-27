import { useState } from 'react';
import { generateArticleSchema } from '../types/Schema';
import { scrapeUrl } from '../utils/scraper';

export function useSchemaGeneration() {
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSchema = async (schemaType: 'medical' | 'article', articleBody?: string) => {
    if (!url) {
      setError('Lütfen bir URL girin');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      let scrapedData;
      if (schemaType === 'article' && articleBody) {
        // Manuel girilen içeriği kullan
        scrapedData = {
          url,
          title: '', // URL'den çekilecek
          description: '', // URL'den çekilecek
          image: imageUrl,
          datePublished: '', // URL'den çekilecek
          dateModified: '', // URL'den çekilecek
          articleBody
        };
        
        // Başlık ve diğer meta verileri çek
        const metaData = await scrapeUrl(url);
        scrapedData = {
          ...scrapedData,
          title: metaData.title,
          description: metaData.description,
          datePublished: metaData.datePublished,
          dateModified: metaData.dateModified
        };
      } else {
        // Normal scraping işlemi
        scrapedData = await scrapeUrl(url);
      }
      
      // imageUrl ve schemaType'ı data'ya ekle
      const schemaData = {
        ...scrapedData,
        image: imageUrl || scrapedData.image,
        schemaType
      };
      
      const schema = generateArticleSchema(schemaData);
      setGeneratedSchema(JSON.stringify(schema, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      setGeneratedSchema('');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    url,
    setUrl,
    imageUrl,
    setImageUrl,
    generatedSchema,
    isLoading,
    error,
    generateSchema
  };
}