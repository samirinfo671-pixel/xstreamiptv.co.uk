import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://xstreamiptv-co-uk.vercel.app'
  const slugs = getAllPostSlugs()

  const blogPosts = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...blogPosts,
  ]
}
