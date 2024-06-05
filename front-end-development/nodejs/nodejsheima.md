# NODEJS基础2

## 1.学习路线

JS基础语言，Node.js内置API(fs…)，第三方模块(exporess，mysql…)



## 2.初次学习

::: tip NodeJs常用命令

`1).创建文件 first.js`

`2).进入终端 执行 node first.js`

`3).输出`

这里注意使用 node的初级用法

:::

:::danger cls <kbd>回车</kbd>

清空控制台

:::

### 2.1 fs文件系统模块

```js
const fs = require(‘fs’)
fs.readFile(path[,options],callbak)
```

参数解读：

* 参数1:必选参数，路径
* 参数2:可选参数，以什么编码格式读取
* 参数3:必选参数，回调函数拿去结果



:::danger 同步异步的学习

```js
const promises = ()=>{
   return new Promise((resolve,reject)=>{
     if(true){
       resolve() //成功执行 这里设置返回值
     }else{
       reject() //false 失败聚聚 这里设置返回值
     }
  }) 
}
//改为同步
const execute = async()=>{
  let ret = await promises();
  //等待上面的执行成功后才会有后续的
}

//常见的先登录后执行其他的信息

```

:::

:::danger 阻塞和非阻塞

> 例如 readFilesync 就是阻塞的 执行读取文件后才进行后续操作
>
> readFile是非阻塞的，直接在callback函数里调用即可

:::

```jsx
const fileader = () => {
  console.log("进入阻塞执行方法");
  return fs.readFileSync(path);
};
 
const fileReader = () => {
  return new Promise((resolve, reject) => {
    console.log("进入非阻塞执行");
    fs.readFile(path, encoding, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
//同步方法
const test = async () => {
  let data = await fileader();
  console.log(`阻塞执行方法值：${data}`);
  await fileReader().then((result) =>
    console.log(`利用Promise拿到读取文件值，非阻塞方式:${result}`)
  );
  let retFileReader = await fileReader();

  console.log(`利用Promise同步返回值，非阻塞方式：${retFileReader}`);
  console.log("执行完毕");
};

test();

```

>进入阻塞执行方法
>阻塞执行方法值：get value
>                
>进入非阻塞执行
>利用Promise拿到读取文件值，非阻塞方式:get value
>                
>进入非阻塞执行
>利用Promise同步返回值，非阻塞方式：get value
>                
>执行完毕

### 2.2 http服务

#### 2.2.1 require(‘http’)

#### 2.2.2 createServer()创建server

#### 2.2.3 绑定request事件

#### 2.2.4 启动服务器 listen

```jsx
const http = require("http");
/**不需要第三方的web服务器软件即可实现 */
const hostname = "zbsilent.com";
const port = "8081";
/**1.createServer
 * 2.on
 * 3.listen
 */
const server = http
  .createServer()
  .on("request", (request, response) => {
    //console.log(response.write('hello world'))
    console.log("请求已经获取");
    const str = `请求地址${request.url},方法${request.method}`;
    console.log(request.headers.referer);
    response.setHeader('Content-type','text/html;charset=utf-8');
    response.end(str);
  })
  .listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}服务器已启动`);
  });

```



### 2.3 commonJs模块化

* 内置模块 fs，http
* 自定义模块 每个js文件都是一个自定义模块
* 第三方模块 非官方，非自定义模块 需要首先下载



#### 2.3.1 require加载模块

#### 2.3.2 Nodejs中的模块作用域

* 放置了全局变量的污染

#### 2.3.3 model 

```js
Module {
  id: '.',
  path: '/Users/zbsilent/Developer/aurora/nodejstudy/modeljs',
  exports: {},
  parent: null,
  filename: '/Users/zbsilent/Developer/aurora/nodejstudy/modeljs/index1.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/zbsilent/Developer/aurora/nodejstudy/modeljs/node_modules',
    '/Users/zbsilent/Developer/aurora/nodejstudy/node_modules',
    '/Users/zbsilent/Developer/aurora/node_modules',
    '/Users/zbsilent/Developer/node_modules',
    '/Users/zbsilent/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```



#### 2.3.1基本使用

```js
const username ='张三'
module.exports.username = username
module.exports.sayHello = function (){
    console.log(username)
}
 
const index = require('./index')
console.log(index.sayHello())
console.log(module)

```

#### 2.3.2 进阶使用

```js
const username ='张三'
module.exports.username = username
module.exports.sayHello = function (){
    console.log(username)
}
 
/**重新指向*/
module.exports ={
    nickName:'小黑',
    sayName(){
        console.log('test')
    }
}
const index = require('./index')
console.log(index)

```

`Return:
{ nickName: '小黑', sayName: [Function: sayName] }`

#### 2.3.3 exprots和module.exports

:::tip 

指向同一个对象,最终指向结果为module.exports指向对象为准

require指向永远是module.exports的指向为准

:::

```js {1}
console.log(exports)
console.log(module.exports)
console.log(module.exports === exports)
```

`Return:
{}
{}
true`

![image-20220313134353779](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220313134353779.png)

```js
exports.username='111'
module.export.gender='222'
```

`Return:`

`{username:’1111’,gender:’222’}`

 

### 2.4 [NPM与包](https://www.npmjs.com/)

* 第三方个人或者团队开发维护的，免费的提供使用









----

_Reference_:

_1. 浏览器中的javaScript包含Js核心语法及WebAPI_

_2. 基于Chrome V8引擎的javaScript运行时[环境]_

_3. LTS为长期稳定版本，Current为新特性尝鲜版_





