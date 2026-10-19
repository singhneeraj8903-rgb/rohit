
/**
 * PDFRang Sitemap Generation
 * Generates sitemap.xml for all pages across all locales.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';
import { getAllTools } from '@/config/tools';

// PDFRang website URL
const BASE_URL = 'https://www.pdfrang.recipeoai.com';

// Required for static export
export const dynamic = 'force-static';

const PRIORITY = {
  home: 1.0,
  tools: 0.9,
  toolPage: 0.8,
  static: 0.6,
} as const;

const CHANGE_FREQUENCY = {
  home: 'daily',
  tools: 'weekly',
  toolPage: 'weekly',
  static: 'monthly',
} as const;

// Static pages available for each locale
const STATIC_PAGES = [
  {
    path: '',
    priority: PRIORITY.home,
    changeFrequency: CHANGE_FREQUENCY.home,
  },
  {
    path: '/tools',
    priority: PRIORITY.tools,
    changeFrequency: CHANGE_FREQUENCY.tools,
  },
  {
    path: '/about',
    priority: PRIORITY.static,
    changeFrequency: CHANGE_FREQUENCY.static,
  },
  {
    path: '/faq',
    priority: PRIORITY.static,
    changeFrequency: CHANGE_FREQUENCY.static,
  },
  {
    path: '/privacy',
    priority: PRIORITY.static,
    changeFrequency: CHANGE_FREQUENCY.static,
  },
  {
    path: '/cookies',
    priority: PRIORITY.static,
    changeFrequency: CHANGE_FREQUENCY.static,
  },
  {
    path: '/disclaimer',
    priority: PRIORITY.static,
    changeFrequency: CHANGE_FREQUENCY.static,
  },
  {
    path: '/contact',
    priority: PRIORITY.static,
    changeFrequency: CHANGE_FREQUENCY.static,
  },
];

function generateLocaleEntries(
  locale: Locale,
  lastModified: Date,
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // PDF tools pages
  const tools = getAllTools();

  for (const tool of tools) {
    entries.push({
      url: `${BASE_URL}/${locale}/tools/${tool.slug}`,
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.toolPage,
      priority: PRIORITY.toolPage,
    });
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const allEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    allEntries.push(...generateLocaleEntries(locale, lastModified));
  }

  return allEntries;
}

// Useful for sitemap validation and testing
export function getSitemapUrlCount(): number {
  return (STATIC_PAGES.length + getAllTools().length) * locales.length;
}
