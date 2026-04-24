const env = (key: string, fallback: string) => process.env[key] ?? fallback;

const siteUrlDefault = 'http://localhost:3000';
const siteNameDefault = 'shenn.xyz';

export const siteConfig = {
  url: env('NEXT_PUBLIC_SITE_URL', siteUrlDefault),
  name: env('NEXT_PUBLIC_SITE_NAME', siteNameDefault),
  description: env('NEXT_PUBLIC_SITE_DESCRIPTION', "Silas Shen's blog"),
  author: {
    name: env('NEXT_PUBLIC_AUTHOR_NAME', siteNameDefault),
    url: env('NEXT_PUBLIC_AUTHOR_URL', siteUrlDefault),
  },
  rss: {
    title: env('NEXT_PUBLIC_RSS_TITLE', '不求谌解'),
    description: env(
      'NEXT_PUBLIC_RSS_DESCRIPTION',
      '💻 Web Dev / Creative 💗 ⚽ 🎧 🏓',
    ),
  },
  githubUrl: env('NEXT_PUBLIC_GITHUB_URL', 'https://github.com/occupy5'),
  repo: {
    owner: env('NEXT_PUBLIC_REPO_OWNER', 'occupy5'),
    name: env('NEXT_PUBLIC_REPO_NAME', 'blog'),
    branch: env('NEXT_PUBLIC_REPO_BRANCH', 'main'),
  },
  assets: {
    host: env('NEXT_PUBLIC_ASSET_HOST', 'blog-assets.shenn.xyz'),
  },
  og: {
    font: env('NEXT_PUBLIC_OG_FONT', 'Noto+Sans+SC'),
    defaultTitle: env('NEXT_PUBLIC_OG_TITLE', siteNameDefault),
  },
  faviconServiceBase: env(
    'NEXT_PUBLIC_FAVICON_SERVICE',
    'https://t1.gstatic.com/faviconV2',
  ),
};
