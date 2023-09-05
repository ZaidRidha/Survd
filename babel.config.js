// babel.config.js
module.exports = function toExport(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          root: ['.'],
          alias: {
            assets: './assets',
            components: './components',
            navigation: './navigation',
            screens: './screens',
            slices: './slices',
          },
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'nativewind/babel',
    ],
  };
};
