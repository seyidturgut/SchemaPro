export interface SchemaData {
  url: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  articleBody?: string;
  categories?: string[];
}

export interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  item: {
    "@type": string;
    "@id": string;
    name: string;
  };
}

export function generateArticleSchema(data: SchemaData) {
  const isServicePage = data.url.includes('/tedaviler/');

  // Görsel validasyonu
  const isValidImage = (url?: string): boolean => {
    if (!url) return false;
    if (url.startsWith('data:')) return false;
    if (!url.match(/\.(jpg|jpeg|png|webp|gif)$/i)) return false;
    return true;
  };

  const defaultImage = 'https://romatem.com/wp-content/uploads/romatem-default-image.webp';
  const imageUrl = isValidImage(data.image) ? data.image : defaultImage;

  // Breadcrumb oluştur
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Thing",
        "@id": "https://romatem.com/",
        name: "Anasayfa"
      }
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Thing",
        "@id": "https://romatem.com/tedaviler",
        name: "Tedaviler"
      }
    }
  ];

  // Son breadcrumb item'ı ekle
  breadcrumbItems.push({
    "@type": "ListItem",
    position: 3,
    item: {
      "@type": "WebPage",
      "@id": data.url,
      name: data.title
    }
  });

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": data.title,
    "description": data.description,
    "url": data.url,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Romatem Fizik Tedavi ve Rehabilitasyon Hastanesi",
      "@id": "https://romatem.com/#organization",
      "url": "https://romatem.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://romatem.com/wp-content/uploads/2024/09/logo.svg",
        "width": 190,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "name": data.title,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "numberOfItems": breadcrumbItems.length,
      "itemListElement": breadcrumbItems
    },
    "author": {
      "@type": "Organization",
      "name": "Romatem Tıbbi Yayın Kurulu",
      "url": "https://romatem.com/romatem-tibbi-yayin-kurulu/",
      "@id": "https://romatem.com/#organization"
    }
  };

  if (isServicePage) {
    return {
      ...baseSchema,
      "about": {
        "@type": "MedicalTherapy",
        "name": data.title,
        "description": data.description,
        "relevantSpecialty": ["Fiziksel Tıp ve Rehabilitasyon", "Nöroloji"],
        "guideline": {
          "@type": "MedicalGuideline",
          "evidenceLevel": "http://schema.org/EvidenceLevelB",
          "guidelineDate": data.dateModified || data.datePublished
        }
      }
    };
  }

  return {
    ...baseSchema,
    "articleBody": data.articleBody,
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://romatem.com/#website",
      "url": "https://romatem.com",
      "name": "Romatem Sağlık Grubu",
      "description": "Fizik Tedavi ve Rehabilitasyon Merkezi",
      "publisher": {
        "@id": "https://romatem.com/#organization"
      }
    }
  };
}