import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</hero-bg.mp4>; rel=preload; as=video; type="video/mp4"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
