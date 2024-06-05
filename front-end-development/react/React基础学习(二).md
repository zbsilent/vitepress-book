---
tags:
  - react
  - typescript
  - ts
---

# REACT&TS基础01

## 初始化项目

`_npx create-react-app projectName –template typescript_`

* 设置绝对路径访问 为./src

```json {3}
{
  "compilerOptions": {
    "baseUrl": "./src",
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

### [Prettier](https://www.prettier.cn/docs//install.html)

> _npm i --save-dev --save-exact prettier_
>
> echo {}> .prettierrc.json
>
> echo {}> .prettierignore > \# Ignore artifacts: build coverage 让 Prettier CLI 和编辑器知道哪些文件*不能*格式化
>
> npm install --save-dev husky lint-staged
> npx husky install
> npm set-script prepare "husky install"
> npx husky add .husky/pre-commit "npx lint-staged"
>
> Add {  "lint-staged": {    "**/*": "prettier --write --ignore-unknown"  } } to package.json
>
> install: _npm install --save-dev eslint-config-prettier_
>
> Add " prettier " to package.json file

### [Commitment](https://commitlint.js.org/)

><font color='green'>install</font>: npm install -g @commitlint/cli @commitlint/config-conventional
>
>run: echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
>
>run:npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'

### [JSON SERVER](https://github.com/typicode/json-server)

:::tip

<font color='lightgreen'>install</font>:npm install -g json-server

<font color='lightgreen'>crate file</font>: 

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

<font color='lightgreen'>run</font> :json-server --watch db.json

实际使用的时候:

1. Crate dir: `__json_server_mock__/db.json`
2. Create Script: `"json-server": "json-server __json_server_mock__/db.json --watch",`

:::

### React用JSX列表渲染开发工程列表页面

### 状态提升

> 其实可以理解为 父子子组件 将子组件的状态提升到父组件中 利用父子传值解决

:::tip

<font color='red'>安装</font> npm install qs

使用``qs.stringfy(cleanObject(param))`` 可以处理参数

:::

### 自定义Hooks 用Custom Hook提取并复用组件代码

#### useMount

:::danger 这里必须使用use开头

```js {1}
export const useMount=(callback)=>{
   useEffect(()=>{
       callback()
   },[])
};
```

:::

#### useDebounce 处理快速事件 比如鼠标，键盘，窗口

:::danger 处理连续事件 比如数据输入onchange事件 1111 1 1 11 1 这样处理参数会更好

```js
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
};
```

:::

## 核心编程

### TypeScript 静态代码就可以检查异常

> Interface 相当于使用说明书 必须定义出来
>
> index.d.ts 就是js的说明书文件

:::tip

*//@ts-ignore* 可以使用

delay?: number ?表示要么不传，要传就传number

Unknown是一个严格版本的any

:::

### 范型

#### 范型函数的几种恶心写法

```tsx
export const ifFalsy: (value: unknown) => boolean = (value) => {  return value === 0 ? false : !value;};
export function useDebounceFuc<T>(value:T,delay?:number):T{return value;}
export const useDebounceJt =<T>(value:T,delay?:number)=>{return value;}
export const useDebounce:<T>(value: T, delay?: number)=>(T)  =(value,delay)=> {return value}
```



### JWT

### Context 全局状态管理 可以替换掉redux

### Hooks

* 只在最顶层、只在函数及自定义hook中可以用

## 跨域解决方案

```tsx
// const proxy = require("http-proxy-middleware");
//npm install http-proxy-middleware

// const { createProxyMiddleware } = require("http-proxy-middleware");
import {createProxyMiddleware, RequestHandler} from 'http-proxy-middleware'
module.exports = function (app: { use: (arg0: RequestHandler, arg1: RequestHandler, arg2: RequestHandler) => void; } ) {
  app.use(
    createProxyMiddleware(
      "/api", //遇到api前缀的请求触发该代理
      {
        target: "http://mmbiz.qpic.cn", //请求转发地址
        changeOrigin: true, //控制服务器收到的响应头中的host字段的值
        pathRewrite: { "^/api": "" }, //重写请求路径
      }
    ),
    createProxyMiddleware("/customer", {
      target: "http://localhost:8001",
      changeOrigin: true,
      pathRewrite: { "^/customer": "" },
    }),
    createProxyMiddleware("/iot", {
      target: "http://116.63.161.17:9999",
      changeOrigin: true,
      pathRewrite: { "^/iot": "" },
    }),
  );
};

```

 

## Utility Types



联合类型 

```tsx
let myoption:string | number
myoption = 7 
myoption = 'seven'
```

类型别名 <font color='#5cb270'>type可以与interface可以互换</font>

```tsx {1}
type FavoriteNumber = stirng | number //类型别名 这种情况下无法替换
interface Person{
  name:string
}
const xm:Person ={name:'小明'}
```

> _[Utility Types]() interface 无法实现 Utility Types_

:::tip

utiltiy 用范型传入其他类型，对这个类型进行某种操作

```tsx {5}{8}{9}
type person {
	name:string;
	age:number
}
//Partial 将person变为可选
const xm:Partial<Person> ={name:'小明'/*,age:17*/} 
//Omit 删掉类型中的某种属性 去掉了name属性
const smr:Omit<Person,'name'> ={ age:17 } 
const smr:Omit<Person,'name' ｜ 'age'> ={} 

type PersonKeys = keyof Person //取出对象的键值，形成一个联合类型
type Partial<T> = {
  [p in keyof T]?:T[P]; //
}
```



Js中的typeof是在runtiome时运行的，ts中是在<font color='ff8989'>静态中运行的</font>

`<typeof http>` _ts中静态类型，提取变量类型_

:::



[CRACO](https://github.com/gsoft-inc/craco)

_Refences_:_Create React **A** pp **C** configuration **O** verride是**一个用于 create-react** **-** app 的简单易懂的配置层。_

:::tip

[RUN:]() npm install @craco/craco --save

​	  npm i -S craco-less #或者

​	  npm i -S craco-antd antd

[CREATE:]()

```shell {3}
my-app
├── node_modules
├── craco.config.js
└── package.json
```

[ALTER:]()

```
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

[REPLACE:]()

```
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@link-color": "#1DA57A",
              "@border-radius-base": "2px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

```js
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
          "@link-color": "#1DA57A",
        },
      },
    },
  ],
};
```



:::

## Emotion

_Reference_:_Emotion 是一个专为使用 JavaScript 编写 css 样式而设计的库_

:::tip

[RUN:]()npm i @emotion/react

```jsx
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const color = 'white'

render(
  <div
    css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```

[RUN:]()npm i @emotion/styled @emotion/react

```jsx
import styled from '@emotion/styled'

const Button = styled.button` /*这里可以使用style(组件的高端东西)*/
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

render(<Button>This my button component.</Button>)
```

:::



### CSS

> em px的相对元素 相对于父元素的font-size
>
> rem 相对于html的font-size，r就是root的意思 1rm === 10px

```css
html {
  font-size:62.5%
}
html body #root .App {
  min-height: 100vh //100视口高度
}
```



