import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withPlaiceholder from '@plaiceholder/next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // DEVELOPMENT
  devIndicators: {
    buildActivityPosition: 'top-left',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

const exportWithNextIntl = withNextIntl(nextConfig);

export default withPlaiceholder(exportWithNextIntl);
