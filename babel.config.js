// babel.config.js
module.exports = function toExport(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "nativewind/babel"
    ],
  };
};
