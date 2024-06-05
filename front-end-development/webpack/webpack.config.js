const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //模式
  mode: "production", // "production" | "development" | "none" 指定开发模式
  //入口 打包开始起点 可可以是数组格式[./src/index.ts,./src/a.ts chunk只能是一个]
  entry: {
    app: "./src/index.ts", //打包文件
  },
  //load配置
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/, //表示node_modules中的tsx文件不做处理
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true, //自动修复
        },
      },
    ],
  },
  //输出
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "pro_build"),
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["app"], //把哪几个命名的引入到html
      minify: {
        collapseWhitespace: true, //压缩去除空格
        removeComments: true,
      },
    }),
  ],
  //需要这个配置才能自动刷新
  target: "web",
  //devServer配置
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    open: true, //自动打开浏览器
  },
};
