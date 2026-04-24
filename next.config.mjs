import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST ?? 'blog-assets.shenn.xyz';

/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ['typescript', 'twoslash'],
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: assetHost,
      },
    ],
  },
  reactStrictMode: true,
};

export default withMDX(config);
