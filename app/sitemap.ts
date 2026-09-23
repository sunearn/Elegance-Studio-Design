import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: new URL('/', SITE_URL).toString(), changeFrequency: 'weekly', priority: 1 },
    { url: new URL('/projects', SITE_URL).toString(), changeFrequency: 'monthly', priority: 0.8 },
    { url: new URL('/services', SITE_URL).toString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: new URL('/studio', SITE_URL).toString(), changeFrequency: 'monthly', priority: 0.6 },
    { url: new URL('/contact', SITE_URL).toString(), changeFrequency: 'yearly', priority: 0.6 },
  ];
  return [...pages, ...projects.map((project) => ({ url: new URL('/projects/' + project.slug, SITE_URL).toString(), changeFrequency: 'yearly' as const, priority: 0.6 }))];
}
