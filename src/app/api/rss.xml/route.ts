import { Feed } from 'feed';
import { getPosts } from '@/lib/source';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

const escapeForXML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

export const GET = () => {
  const baseUrl = new URL(siteConfig.url);

  const feed = new Feed({
    title: siteConfig.rss.title,
    description: siteConfig.rss.description,
    id: baseUrl.href,
    copyright: siteConfig.name,
    link: baseUrl.href,
    feed: new URL('/api/rss.xml', baseUrl).href,
    updated: new Date(),
    favicon: new URL('/favicon.ico', baseUrl).href,
  });

  const posts = getPosts();

  for (const post of posts) {
    const imageParams = new URLSearchParams();
    imageParams.set('title', post.data.title);
    imageParams.set('description', post.data.description ?? '');

    feed.addItem({
      title: post.data.title,
      description: post.data.description,
      link: new URL(post.url, baseUrl).href,
      image: {
        title: post.data.title,
        type: 'image/png',
        url: escapeForXML(new URL(`/api/og?${imageParams}`, baseUrl).href),
      },
      date: post.data.date,
      author: [
        {
          name: siteConfig.author.name,
          link: siteConfig.author.url,
        },
      ],
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
