import { getPostTags } from '@lib/get-post-tags'
import { getPosts } from '@lib/get-posts'
import { website } from '@lib/info'
import slugify from 'slugify'

export const GET = async () => {
  const postsMeta = getPosts()
  const { tags } = getPostTags()
  const pages = [
    `about`,
    `faq`,
    `newsletter`,
    `now`,
    `portfolio`,
    `privacy-policy`,
  ]
  const body = render(pages, tags, postsMeta)

  return new Response(body,{
    headers: {
      'content-type': 'application/xml',
      'cache-control': 'max-age=0, s-maxage=3600',
    },
  })
}

const render = (
  pages,
  tags,
  postsMeta
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset 
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${website}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${postsMeta
    .map(({ metadata }) =>
      metadata.isPrivate
        ? null
        : `
  <url>
    <loc>${website}/posts/${metadata.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  `
    )
    .join('')}
  ${pages
    .map(
      page => `
  <url>
    <loc>${website}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
  ${tags
    .map(
      tag => `
  <url>
    <loc>${website}/tags/${slugify(tag)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>
`
