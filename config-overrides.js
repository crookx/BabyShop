const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: false,
      url: require.resolve('url'),
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      process: false
    },
    alias: {
      ...config.resolve.alias,
      'process/browser': 'process/browser.js'
    }
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process'
    })
  ];

  return config;
}