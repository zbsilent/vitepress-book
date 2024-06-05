# REACT脚手架<sup>![](https://img.shields.io/badge/React-zbsilent-brightgreen)</sup>


## 安装脚手架

:::tip 高版本
npx crate-react-app appName --template typescript
:::

```bash
npm install -g create-react-app
```

## 安装完成效果

![image-20210320153134112](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210320153134112.png)

## 验证版本

```bash
create-react-app --version
4.0.3
```

## 如何使用

```bash
create-react-app myReact
```

==public== $\rightarrow$ ==index.html== $\rightarrow$ root html

Src - app.js $\leftarrow$ 所有组件 可以丢里面

app.js 汇总组件 $\rightarrow$ index.js渲染 $\rightarrow$ indexhtml

```text
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)
```

> **StrictMode** 是一个用以标记出应用中潜在问题的工具。就像 **Fragment** ，**StrictMode** 不会渲染任何真实的UI。它为其后代元素触发额外的检查和警告。

使用`StrictMode`的优点：

* 识别不安全的生命周期组件
* 有关旧式字符串ref用法的警告
* 关于使用废弃的 findDOMNode 方法的警告
* 检测意外的副作用
* 检测过时的 context API

## 举个例子

举个栗子🌰，使用 `React`做一个图片展示

```markup
<div>
    <ul>
        <li img src=''></li>
    </ul>
    <ol>

    </ol>
</div>
```

`React脚手架搭建不运行 请使用 npm cache clean --force 清除缓存`

## 样式模块化

> css 文件 index.module.css 可以使用以下方式
>
> ```markup
> import xxx from './index.module.css' 
> <h2 className={hello.title}
> ```

