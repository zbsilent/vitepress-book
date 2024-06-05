# AXIOS与PROMISE

![GitHub all releases](https://img.shields.io/github/downloads/zbsilent/GitBook/total?color=red)
![GitHub](https://img.shields.io/github/license/zbsilent/GitBook?color=brightgreen&logoColor=brightgreen)
## Promise的原理和应用

### 回调地狱

* 循环嵌套调用产生回调地狱

```js
{
 $.get("url1",data2=>{
     $.get("url2",data3=>{

     })
 })
}
```

```js
<script>
new Promise((resolve, reject) => {
       console.log(`这是弟一层`)
       //成功会返回resolve
       resolve('这是第二层')
       //异常就会调用reject
       //reject('这是一个错误')
   }).then(res => {
       console.log(res)
       //成功后可以持续调用
       // return new Promise((resolve, reject)=>{
       //     resolve('这是第s三层层')
       // })
       //简写
       // return Promise.resolve("")
       //继续简写
       return { message: '', code: 200, data: null }
   }, error => {
       console.log(error)
   }).then(res => {
       console.log(res)
   })
</script>
```


```js
<body>
    <script>
        function demo(message, timer) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ msg: message, code: 200 })
                }, timer * 1000)
            })
        }

        new Promise((resolve, reject) => {
            console.log('---->进入程序')
            setTimeout(() => {
                resolve('---->flag:success')
            }, 1000)
        }).then(
            res => {
                console.log(`第一次成功返回---->Return${res}`);
                return demo('成功', 1);//这里得返回一个Promise对象
            }
        ).then(
            netRes => {
                console.log(netRes);
            }
        ).catch((error) => {
            console.log("error:" + error)
        })
    </script>
</body>
```

* 并发请求

```js{3}
<body>
    <script>
        Promise.all([
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('第一个并发请求')
                }, 1000)

            }),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('第二个并发请求')
                }, 1000)
            })
        ]).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    </script>
</body>
```
## [Axios请求](https://www.bootcdn.cn/axios/)

:::danger 注意
axios()/axios.get/pot()请求均返回一个Promise对象
:::

```js
<body>
    <script>
        const promise = axios.post('http://127.0.0.1:8080/public/logo.png', {
            Headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: '',
                age: ''
            }
        }).then(
            result => {
                console.log(result)
            }
        ).catch(error => {
            console.log(`ERROR:`, error.message)
        })
        //console.log(`return Promise Object`, promise)
    </script>
</body>
```

* 基础使用webpack下载axios包引用的方式去使用

```sh
npm init -y
npm i axios -S
npm i webpack webpack-cli -D
```

```js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin)

module.export{
    //开发模式
    mode:"development",
    //入口文件
    entry:{
        app:'./src/index.js'
    },
    //插件
    plugin:[ 
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
     //输出
    output: {
        filename: "[name].[contenthash:8].js",
        path: path.resolve(__dirname, "build"),
    },

}
```

* 并发请求

```js
axios.all([
    axios.get(),
    axios.get(),
    ...
]).then(
    response =>{
    ... //这里返回的是数组
    },
    //也可以用下面这样的方法拆分处理
    axios.spread((res1,res2,res3))=>{

    }
).catch(error=>{
    ...  
})
```

### 全局缺省配置

* 放到js文件 导出即可


```js
axios.default.baseURL = "";
axios.default.timeout = 500;
axios.default.headers.post['Content-Type']='application/x-www=form-urlencoded';
...

```
* axios封装

```js
let api = axios.create({
    baseURL:'http://api.local.com',//请求地址
    timeOut:5000,//超时设置
    method:'post',//请求方法
    headers:,//设置请求头
    params:,//请求头参数拼接
    data://请求参数放在request body中

})
let local = axios.create({
    baseURL:"http://baidu.com",
    timeOut:5000,

})
export {api ,local} 
...

```

:::warning 重点记忆
同步和异步请求
 ```js
 //这里的firt()函数实际上返回了一个promi对象
 const first = async function () {
     return 20;
 }

 const doAction = function () {
     // 这样的话先等几过返回，时间上肯定慢
     first().then(res => {
         console.log(res)
     });
     //所以异步先执行了下面这句
     console.log('执行完毕');
 }
 doAction()
 ```

> _Return_:执行完毕<br/>
> _Return_:20

* 改成同步请求

```js
 const doAction = async function () {
     // 这样的话先等几过返回，时间上肯定慢
     await first().then(res => {
         console.log(res)
     });
     //所以异步先执行了下面这句
     console.log('执行完毕');
 }
 doAction()
```

> _Return_:20<br/>
> _Return_:执行完毕

* 本身返回Promise的函数不用标志<font color='red'>async</font>
  
```js
 //本身返回一个Promise对象的值
const second = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(20)
        }, 5000)
    })
}
const doany =  function () {
    let result =  second();//这里实际上说等的时候返回值 如果去掉await就是表达势
    console.log(result);
    console.log('执行完毕');
}
doany();
}
```
> _Return_:{Promise}<br/>
> _Return_:执行完毕
```js
const doany =  async function () {
        let result =  await second();//这里实际上说等的时候返回值 如果去掉await就是表达势
        console.log(result);
        console.log('执行完毕');

}
doany()
```
>  等待5秒后<br/>
> _Return_:{Promise}<br/>
> _Return_:执行完毕

:::

### 请求拦截器

* 拦截器 _<font color='red'>interceptors.request/response.use()</font>_
  
```js
//这里设置在对象上
api.interceptors.request.use(config=>{
    //请求的拦截成功，处理一下
    //放行
    return config;
},err=>{

})
//全局 从服务器将数据带回后处理
axios.interceptors.response.use(....)


import axios from "axios";

const BaseAxios = axios.create({
  baseURL:
    " http://116.63.161.17:9999/core-data-v2/api/v2/valueDescriptor/device",
  timeout: 5000,
  //params:,//请求头参数拼接
  //data://请求参数放在request body中
});
const get = (url?: string, data?: any): any => {
  debugger;
  console.log("获取Axios配置信息", window.location.origin);
  if (data === null || data === undefined) {
    data = "";
  }
  BaseAxios.interceptors.request.use(
    (config) => {
      console.log(`拦截器获得config:`, config);
      //这里可以使用拦击器构建URL
      config.baseURL = config.baseURL + data;
      return config;
    },
    (error) => {
      console.log(error);
    }
  );
  return BaseAxios.get(url || "", {
    data,
  });
};
const post = (url?: string, data?: any): any => {
  BaseAxios.post(url || "", data, {
    transformRequest: [],
    headers: {},
  });
};
export { get, post };

```

## 单代理

### axis 基本用法

```javascript
Axios.get("http://localhost:5000/students").then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
```

### Server 设置

```javascript
const express = require('express')
const app = express()

app.use((request,response,next)=>{
    console.log('有人请求服务器1了');
    console.log('请求来自于',request.get('Host'));
    console.log('请求的地址',request.url);
    next()
})

app.get('/students',(request,response)=>{
    const students = [
        {id:'001',name:'tom',age:18},
        {id:'002',name:'jerry',age:19},
        {id:'003',name:'tony',age:120},
    ]
    response.send(students)
})

app.listen(5000,(err)=>{
    if(!err) console.log('服务器1启动成功了,请求学生信息地址为：http://localhost:5000/students');
})
```

> 使用 node server1.js 启动服务

### 跨域问题 设置代理 代理端口和客户端端口一致

### 配置代理服务器

> package.json 末尾 增加 `"proxy":"http://localhost:5000"`

```javascript
//这里要特别注意ip地址的坑  localhost 和 127.0.0.1不一样
    const getInfo = () => {
        axios.get("http://localhost:3000/students").then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
```

> `3000端口有的数据，则不进行转发`

## 多代理

* 增加setupProxy.js

```javascript
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/api1",//遇到api前缀的请求触发该代理
        {
        target: "http://localhost:5000",//请求转发地址
        changeOrigin: true,//控制服务器收到的响应头中的host字段的值 
        pathRewrite: { "^/api1": "" },//重写请求路径
          }),
        proxy("/api2",
     {
            target: "http://localhost:5001",
            changeOrigin: true,
            pathRewrite: { "^/api2": "" },
        })
    );
};
```

## 说明

- success -> 决定做这个事
- error -> 放弃做这个事



- 参数：
  - resolve 决定
  - reject 放弃

- 静态方法
  - Promise.resolve()  走第一个函数
  - Promise.reject() 走catch
  - race 竞速

## 实例

```js
Promise.resolve(1).then((m)=>{console.log(m);})
Promise.reject('args').then(()=>{console.log('成功输出')},(m)=>{console.log(m)})	
```

```js
# 先进先出，失败就是失败
Promise.race([new Promise((resolve,reject)=>{
		setTimeout(resolve,300,'one');
	}),new Promise((resolve,reject)=>{
		setTimeout(resolve,500,'two');
	})]).then((l)=>console.log(l))
```

```js
Promise.all([Promise.resolve('1'),2,3]).then((m)=>console.log(m));
```

