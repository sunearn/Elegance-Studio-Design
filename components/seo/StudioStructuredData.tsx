import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo';

const structuredData = {
  '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME,
  description: 'Elegance Design Studio creates considered homes and interiors in Kharadi, Pune, India.',
  url: SITE_URL.toString(), logo: new URL(DEFAULT_OG_IMAGE, SITE_URL).toString(),
  address: { '@type': 'PostalAddress', addressLocality: 'Kharadi', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  email: 'rupali.pawankar13@gmail.com', telephone: ['+91 98223 01090', '+91 86686 83792'],
  areaServed: { '@type': 'City', name: 'Pune', containedInPlace: { '@type': 'State', name: 'Maharashtra' } },
};

export function StudioStructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />;
}
