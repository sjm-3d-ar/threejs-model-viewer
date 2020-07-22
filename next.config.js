require("dotenv").config();
const path = require("path");

module.exports = {
  env: {
    API_HOST: process.env.API_HOST,
    GET_CAMPAIGN_API_URL: process.env.GET_CAMPAIGN_API_URL,
    DEEPAR_KEY_URL_APEX: process.env.DEEPAR_KEY_URL_APEX,
    DEEPAR_KEY_URL_WWW_SUBDOMAIN: process.env.DEEPAR_KEY_URL_WWW_SUBDOMAIN,
    DEEPAR_KEY_HOST: process.env.DEEPAR_KEY_HOST,
  },

  // eslint-disable-next-line no-unused-vars
  webpack(config, options) {
    /* eslint-disable no-param-reassign */
    config.resolve.alias._common = path.join(__dirname, "src/components/common");
    config.resolve.alias._helpers = path.join(__dirname, "src/helpers");
    config.resolve.alias._views = path.join(__dirname, "src/components/views");
    config.resolve.alias._utils = path.join(__dirname, "src/utils");

    return config;
  },
};
