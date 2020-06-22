const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path')

module.exports = {
  mode: (process.env.NODE_ENV = "production" ? "production" : "development"),
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"), // __dirname 被执行js绝对路径
    filename: "bundle.js",
  },
  devtool: "source-map", // 开发工具
  devServer: {
    hot: true, // 热更新
    contentBase: path.join(__dirname, "dist"), // 静态文件目录
    historyApiFallback: {
      // browerHistory是刷新报 404 则自动重定向到index.html
      index: "./index.html",
    },
  },
  resolve: {
    // 解析配置
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"], // 自动寻找扩展名
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "tx-loader", // 使用ts-loader 转译
        options: {
          transpileOnly: true, // 是否只转译
        },
      },
    ],
  },
};