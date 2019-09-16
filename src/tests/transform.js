const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'require-context-hook',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
