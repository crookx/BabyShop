const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  // Add rule for .mjs files
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false
    }
  });

  // Configure resolve
  config.resolve = {
    ...config.resolve,
    fallback: {
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      asset: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
      path: require.resolve('path-browserify')
    }
  };

  // Remove existing DefinePlugin instances
  config.plugins = config.plugins.filter(plugin => !(plugin instanceof webpack.DefinePlugin));

  // Add plugins
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  // Add a single DefinePlugin instance
  const definePluginConfig = {};
  Object.keys(process.env).forEach(key => {
    definePluginConfig[`process.env.${key}`] = JSON.stringify(process.env[key]);
  });

  config.plugins.push(
    new webpack.DefinePlugin(definePluginConfig)
  );

  return config;
}