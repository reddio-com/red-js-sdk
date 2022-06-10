module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.input = 'src/index.ts';
    return config; // always return a config.
  },
};
