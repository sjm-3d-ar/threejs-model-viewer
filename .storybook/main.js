/* eslint-disable no-param-reassign */
const path = require("path");

module.exports = {
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-viewport/register",
  ],

  webpackFinal: config => {
    config.resolve.alias._common = path.resolve(__dirname, "../src/components/common");
    config.resolve.alias._helpers = path.resolve(__dirname, "../src/helpers");
    config.resolve.alias._utils = path.resolve(__dirname, "../src/utils");
    config.resolve.alias._views = path.resolve(__dirname, "../src/components/views");

    return config;
  },
};
