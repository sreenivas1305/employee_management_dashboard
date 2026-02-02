/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',

  basePath: isProd ? '/employee_management_dashboard' : '',
  assetPrefix: isProd ? '/employee_management_dashboard/' : '',

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;