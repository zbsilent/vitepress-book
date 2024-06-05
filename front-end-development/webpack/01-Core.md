# WebPack

_webpack for node_

### webpack.config.js

* [核心配置文件](webpack.config.js)

---
```json
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
      chunks:['app'], //把哪几个命名的引入到html
      minify: {
        collapseWhitespace: true, //压缩去除空格
        removeComments:true
      },
    }),
  ],
};

```
---
### eslint

::: tip
nmp i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D

这里需要设置 package.json

```json
"eslintConfig":{
"extends":"airbnb-base"
} 
```
:::
---
### devServer

::: tip
 * <font color="green">npm i webpack-dev-server -D</font>
 * npx webpack server --mode development --open
:::

---
### HMR(模块热替换)

devServer配置增加 `hot:true` 配置