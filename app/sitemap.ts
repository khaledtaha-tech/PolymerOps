import type { MetadataRoute } from 'next';
import { getContent } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || 'https://polymerops.com';
  const routes = ['', 'services', 'consulting', 'software', 'materials', 'talent', 'insights', 'request', 'privacy', 'terms'];
  const list: MetadataRoute.Sitemap = [];

  for (const locale of ['ar', 'en']) {
    for (const path of routes) {
      list.push({
        url: `${base}/${locale}${path ? `/${path}` : ''}`,
        changeFrequency: path ? 'monthly' : 'weekly',
      });
    }
  }

  try {
    for (const kind of ['service', 'software', 'material', 'insight'] as const) {
      const segment = {
        service: 'services',
        software: 'software',
        material: 'materials',
        insight: 'insights',
      }[kind];

      const items = await getContent(kind);
      for (const item of items) {
        for (const locale of ['ar', 'en']) {
          list.push({
            url: `${base}/${locale}/${segment}/${item.slug}`,
            lastModified: item.updated_at,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error generating sitemap dynamic routes:', error);
  }

  return list;
}
