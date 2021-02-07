const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common');

const path = require("path");
const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/Button",
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);
