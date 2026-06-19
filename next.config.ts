import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/avatars/**' },
      { pathname: '/*.png' },
    ],
  },
}

export default nextConfig
