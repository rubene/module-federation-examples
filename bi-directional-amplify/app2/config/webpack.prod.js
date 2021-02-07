const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require('./webpack.common');
const deps = require("../package.json").dependencies;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1@https://d24jcvf7ms0hac.cloudfront.net/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/Button",
        "./App": "./src/App",
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: [
        {
          ...deps,
          react: {
            // eager: true,
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            // eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
          }
        },
      ],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
