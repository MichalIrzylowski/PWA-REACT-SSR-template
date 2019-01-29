const HtmlWebPackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const common = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

const client = {
  ...common,

  entry: {
    client: ["babel-polyfill", "./src/client.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }

  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: path.resolve(__dirname, "src", "index.html"),
  //     filename: "index.html"
  //   })
  // ]

  // devtool: "cheap-module-source-map"
};

const server = {
  ...common,
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    server: ["babel-polyfill", "./src/server.js"]
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};

module.exports = [client, server];
