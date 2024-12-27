export interface SchemaData {
  url: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  articleBody?: string;
  categories?: string[];
  schemaType: 'medical' | 'article';
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
      "position": 1,
      "item": {
        "@type": "Thing",
        "@id": "https://romatem.com/",
        "name": "Anasayfa"
      }
    }
  ];

  // Tedaviler sayfası için ikinci breadcrumb
  if (isServicePage) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Thing",
        "@id": "https://romatem.com/tedaviler",
        "name": "Tedaviler"
      }
    });

    // Son breadcrumb item'ı ekle
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "WebPage",
        "@id": data.url,
        "name": data.title
      }
    });
  } else {
    // Tedavi sayfası değilse direkt son item'ı ekle
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "WebPage",
        "@id": data.url,
        "name": data.title
      }
    });
  }

  const commonFields = {
    "@context": "https://schema.org",
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
      },
      "location": [
        {
          "@type": "Hospital",
          "name": "Romatem Move",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kısıklı, Alemdağ Cd No:62",
            "addressLocality": "Üsküdar",
            "addressRegion": "İstanbul",
            "postalCode": "34692",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Bursa",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kükürtlü, Dr. Sadık Ahmet Cd. No:65",
            "addressLocality": "Osmangazi",
            "addressRegion": "Bursa",
            "postalCode": "16080",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Samsun",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yenimahalle, 7. Sk. no:35",
            "addressLocality": "Canik",
            "addressRegion": "Samsun",
            "postalCode": "55080",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Ankara",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kazım Özalp, Reşit Galip Cd. No: 87",
            "addressLocality": "Çankaya",
            "addressRegion": "Ankara",
            "postalCode": "06700",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Kocaeli",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yahyakaptan, Hanedan Sk. No:4",
            "addressLocality": "İzmit",
            "addressRegion": "Kocaeli",
            "postalCode": "41100",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Fulya",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Fulya, Hakkı Yeten Cd. No:9 Kat:1",
            "addressLocality": "Şişli",
            "addressRegion": "İstanbul",
            "postalCode": "34365",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem İzmir",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Çınarlı, Ozan Abay Cd. No:8 D:307",
            "addressLocality": "Konak",
            "addressRegion": "İzmir",
            "postalCode": "",
            "addressCountry": "TR"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Montenegro",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2 Šeika Zaida",
            "addressLocality": "Podgorica",
            "postalCode": "81000",
            "addressCountry": "ME"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        },
        {
          "@type": "Hospital",
          "name": "Romatem Bakü",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "5 Zarifa Aliyeva St",
            "addressLocality": "Baku",
            "postalCode": "1005",
            "addressCountry": "AZ"
          },
          "telephone": "+444 76 86",
          "email": "iletisim@romatem.com"
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "name": data.title,
    "author": {
      "@type": "Organization",
      "name": "Romatem Tıbbi Yayın Kurulu",
      "url": "https://romatem.com/romatem-tibbi-yayin-kurulu/",
      "@id": "https://romatem.com/#organization"
    }
  };

  // Article Schema
  if (data.schemaType === 'article') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "datePublished": data.datePublished,
      "description": data.description,
      "articleBody": data.articleBody,
      "dateModified": data.dateModified,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.url,
        "name": data.title
      },
      "image": {
        "@type": "ImageObject",
        "url": data.image,
        "height": 980,
        "width": 300
      },
      "author": {
        "@type": "Organization",
        "name": "Romatem Tıbbi Yayın Kurulu",
        "url": "https://romatem.com/romatem-tibbi-yayin-kurulu/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Romatem Fizik Tedavi ve Rehabilitasyon Hastanesi",
        "url": "https://romatem.com/",
        "sameAs": [
          "https://www.facebook.com/romatem.hastaneleri",
          "https://twitter.com/romatem",
          "https://www.instagram.com/romatem/",
          "https://www.youtube.com/@romatemtv"
        ],
        "logo": {
          "@type": "ImageObject",
          "url": "https://romatem.com/wp-content/uploads/2024/09/logo.svg",
          "width": 1920,
          "height": 400
        },
        "location": [
          {
            "@type": "Hospital",
            "name": "Romatem Move",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kısıklı, Alemdağ Cd No:62",
              "addressLocality": "Üsküdar",
              "addressRegion": "İstanbul",
              "postalCode": "34692",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Bursa",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kükürtlü, Dr. Sadık Ahmet Cd. No:65",
              "addressLocality": "Osmangazi",
              "addressRegion": "Bursa",
              "postalCode": "16080",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Samsun",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Yenimahalle, 7. Sk. no:35",
              "addressLocality": "Canik",
              "addressRegion": "Samsun",
              "postalCode": "55080",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Ankara",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kazım Özalp, Reşit Galip Cd. No: 87",
              "addressLocality": "Çankaya",
              "addressRegion": "Ankara",
              "postalCode": "06700",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Kocaeli",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Yahyakaptan, Hanedan Sk. No:4",
              "addressLocality": "İzmit",
              "addressRegion": "Kocaeli",
              "postalCode": "41100",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Fulya",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Fulya, Hakkı Yeten Cd. No:9 Kat:1",
              "addressLocality": "Şişli",
              "addressRegion": "İstanbul",
              "postalCode": "34365",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem İzmir",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Çınarlı, Ozan Abay Cd. No:8 D:307",
              "addressLocality": "Konak",
              "addressRegion": "İzmir",
              "postalCode": "",
              "addressCountry": "TR"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Montenegro",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2 Šeika Zaida",
              "addressLocality": "Podgorica",
              "postalCode": "81000",
              "addressCountry": "ME"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          },
          {
            "@type": "Hospital",
            "name": "Romatem Bakü",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "5 Zarifa Aliyeva St",
              "addressLocality": "Baku",
              "postalCode": "1005",
              "addressCountry": "AZ"
            },
            "telephone": "+444 76 86",
            "email": "iletisim@romatem.com"
          }
        ]
      }
    };
  }

  // Medical Web Page Schema
  const medicalSchema = {
    ...commonFields,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Thing",
            "@id": "https://romatem.com/",
            "name": "Anasayfa"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Thing",
            "@id": "https://romatem.com/tedaviler",
            "name": "Tedaviler"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "WebPage",
            "@id": data.url,
            "name": data.title
          }
        }
      ]
    },
    "@type": "MedicalWebPage"
  };

  // Eğer tedavi sayfasıysa, about özelliğini ekle
  if (isServicePage) {
    return {
      ...medicalSchema,
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

  // Tedavi sayfası değilse, breadcrumb'ı 2 seviyeli yap
  medicalSchema.breadcrumb.itemListElement = medicalSchema.breadcrumb.itemListElement.slice(0, 2);
  medicalSchema.breadcrumb.numberOfItems = 2;

  return medicalSchema;
}