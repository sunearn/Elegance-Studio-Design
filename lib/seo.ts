import type { Metadata } from 'next';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://elegancedesignstudio.in';
export const SITE_URL = new URL(configuredSiteUrl.endsWith('/') ? configuredSiteUrl : configuredSiteUrl + '/');
export const SITE_NAME = 'Elegance Design Studio';
export const DEFAULT_OG_IMAGE = '/elegance-design-studio-logo.svg';

type PageMetadataOptions = { title: string; description: string; path: string; image?: string; imageAlt?: string };

export function pageMetadata({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt = 'Elegance Design Studio logo' }: PageMetadataOptions): Metadata {
  const imageUrl = image.startsWith('http') ? image : new URL(image, SITE_URL);
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: 'en_IN', type: 'website', images: [{ url: imageUrl, alt: imageAlt }] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: imageUrl, alt: imageAlt }] },
  };
}
