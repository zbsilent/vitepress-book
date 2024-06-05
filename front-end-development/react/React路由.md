# ROUTER记忆

![image-20210328010149803](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210328010149803.png)

## SPA理解

* single page web application
* 整个应用只有一个完整的页面
* 数据都需要ajax请求，并在前端异步展现
* 点击链接不会刷新页面，只会局部组件更新

## Router

### 什么是路由？

* 一个路由就是一个key:value映射
* key为路径，value可能是function或者component

### 路由分类

#### 后端路由

* value是function，用来处理客户端提交的请求
* 注册路由：router.get\(path,fuction\(req,res\)\)
* node接受请求，匹配路径，执行函数，响应数据

### 前端路由

* * 注册路径：

## react-router-dom 的理解

* web, native, anywhere三个版本
* 路由器管理路由 Router =&gt; Route
* 专门用来实现一个SPA应用，基于react的项目基本都会用到此库‘

### 内置组件

### 基本使用实例操作方法

> 路由组件放到Pages下，明确导航区和展示区

```jsx
import {Link,BrowserRouter,HashRouter,Route} from 'react-router-dom'
```

`组件最外侧可以 使用 BrowserRouter/HashRouter 封闭`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
```

```jsx
{/*编写路由链接*/}
<Link className= "list-group-item" to="/about">About</Link>
<Link className= "list-group-item" to="/home">Home</Link>
```

```jsx
{/*渲染阶段注册路由*/}
<Route path="/about" component={About}/ >
<Route path="/home" component={Home}/ >
```

### 路由组件接收参数

`一般组件`

* 位置：components
* 写法：&lt;/&gt;
* 接收动态传递参数

`路由组件`

* 写法 ：&lt;Route path="/about" component={About}/ &gt;
* 位置 ：pages
* 接收参数固定

```text
.
├── history
│   ├── go:f go(n)
│   │   └── go.arguments
│   ├── goBack:fgoBack()
│   ├── goForward: f goForward()
│   ├── push: f push(path, state)
│   ├── replace:f replace(path, state)
├── location
│   ├── pathname: "/about"
│   ├── search: 11
│   ├── state: undefined
├── match
│   ├── params:{}
│   ├── path: "/about"
│   ├── url:"/about"
└── tree.md
```

> 追加样式属性
>
> 如果是activeClassName='active' 则可以不加

```css
# ！important提高优先级
.atguigu{
  background-color:rg(209,137,4) !important;
  color:white !important;
}

<NavLink activeClassName ='atguigu' to='/home'>{Home}</NavLink>
```

```javascript
标签体属性<MyNavLink to= "/about"  a={1} b={3}>About</MyNavLink>
得到props
{to: "/about", a: 1, b: 3, children: "About"}
```

`Switch组件，不持续向下，注册路由多个时候用`

### 解决样式丢失问题

_1.0_ 取消html下的. 即取消当前文件夹下的即可

_2.0_ %PUBLIC\_URL$ 绝对路径

_3.0_ HashRouter搞定

### 模糊匹配

* 给多了没那么多无所谓 要的东西一个都不能少\*

​ _1.0_ 路由注册时候用exact方式 就可以严格匹配了\*

​ _2.0_ 输入的路径必须包含【匹配的路径】 且顺序要一致\*

```javascript
<NavLink activeClassName='active' className="list-group-item" to="/island/home/a/b">Home</NavLink>
```

### 路由注`Redirect`重定向

### 传参

```javascript
# 携带param参数，向路由组件传递 
<Link to= {`/home/message/detail/${messageObj.id}/${messageObj.title}`}>{messageObj.title}</Link>
# 注册路由
<Route path="/home/message/Detail/:id/:title" component={Detail} />
# 读取参数
const { id, title } = props.match.params;
```

```javascript
# 传递search参数
<Link to= {`/home/message/detail/?id=${messageObj.id}&title=${messageObj.title}`}>{messageObj.title}</Link>&nbsp;&nbsp;
# 正常申明
<Route path="/home/message/detail/" component={Detail} />
# 读取参数 比较麻烦
import qs from 'querystring'

const {search} = props.location;
const {id,title} = qs.parse(search).slice(1);
```

```javascript
# state参数
<Link to= {{pathname:'/home/message/detail',state:{id:messageObj.id,title:messageObj.title}}}>{messageObj.title}</Link>&nbsp;&nbsp;
# 正常申明
<Route path="/home/message/detail/" component={Detail} />
# 读取参数 
const {id,title} = props.location.state;
```

```javascript
# state参数
<Link  to= {{pathname:'/home/message/detail',state:{id:messageObj.id,title:messageObj.title}}}>{messageObj.title}</Link>&nbsp;&nbsp;
```

