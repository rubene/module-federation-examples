const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: "http://localhost:3002/",
    // publicPath: "https://d3tlpbej7bbuwi.cloudfront.net/",
    // publicPath: 'auto',
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
    ],
  },
  resolve: {
    modules: ['node_modules']
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1@https://d24jcvf7ms0hac.cloudfront.net/remoteEntry.js",
        // app1: "app1@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/Button",
        "./App": "./src/App"
      },
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
