const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias['@reddio/js-sdk'] = path.resolve('../dist/index.js');
    return config;
  },
};

module.exports = nextConfig;
