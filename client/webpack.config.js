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
          // TypeScript 将 TS 代码编译到 JS 的功能，其实也是通过内置的转换器实现的，从 TS 2.3 开始，TS 将此功能开放，允许开发者编写自定义的转换器。
          getCustomTransformers: () => ({
            // ts-import-plugin 按需引入antd
            before: [
              tsImportPluginFactory({
                libraryName: "antd",
                libraryDirectory: "es",
                style: "css",
              }),
            ],
          }),
          compilerOptions: {
            module: "es2015", // 模块范围es2015
          },
        },
      },
      {
        test: /\.css$/, // css处理样式
        use: [
          "style-loader", // 将css 当做style 标签插入html中
          {
            loader: "css-loader", // 处理css中import和url
            options: { importLoaders: 0 }, // 在css-loader后指定几个loader处理@import 进来的资源 0 个的时候没有，1个的时候使用 postcss-loader,2个使用 postcss-loader, sass-loader
          },
          {
            loadeer: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecession: 0, // 精确到8位小数
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", // 将css 当做style 标签插入html中
          {
            loader: "css-loader", // 处理css中import和url
            options: { importLoaders: 0 }, // 在css-loader后指定几个loader处理@import 进来的资源 0 个的时候没有，1个的时候使用 postcss-loader,2个使用 postcss-loader, sass-loader
          },
          {
            loadeer: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecession: 0, // 精确到8位小数
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/, //处理图片,把图片打包到输出目录中
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", //以此文件作为模板拼入打包后的文件并输出到目标目录中
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};