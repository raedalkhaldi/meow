const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        http2: false,
        zlib: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url/'),
        util: require.resolve('util/'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser')
      };

      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      ];
    }
    return config;
  }
};

module.exports = nextConfig; 