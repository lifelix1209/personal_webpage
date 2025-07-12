// next.config.mjs
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  sassOptions: {
    // 这里把 styles 目录加入到 Sass 搜索路径
    includePaths: [path.join(process.cwd(), 'styles')],
    // 可选：压缩输出
    outputStyle: 'compressed',
  },

  reactStrictMode: true, 

  // 这是需要添加或修改的部分
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.api.playstation.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.epicgames.com',
      },
      {
        protocol: 'https',
        hostname: 'media.contentapi.ea.com',
      },
      {
        protocol: 'https',
        hostname: 'images.contentstack.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig
