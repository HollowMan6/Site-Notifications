'use strict';

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  mode: "development",
  resolve: {
    fallback: {
      net: false,
      tls: false,
      fs: false,
    }
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
}