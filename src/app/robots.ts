import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.karluxlocation.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin-login', '/admin/', '/dashboard', '/api/', '/cart', '/checkout'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
