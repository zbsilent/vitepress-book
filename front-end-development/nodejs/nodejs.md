# NODEJS基础

在node中有一个全局变量global，他的作用和网页中window类似
在全局只能够创建的变量会作为global的属性保存
在全局中创建的函数都会作为global的方法保存

当node在执行模块的时候，他会在代码的最前面添加如下代码 :

```js
function (exports,require,module,_filename,_dirname){

}
```


exports 和 module.exports 
  - 通过exports只能使用。的方式来向外暴露内部变量
  - exports.xxx = xxx
  - 而models.exports既可以通过.的形式 也可以直接给赋值
  - module.exports.xxx=xxx
  - module.exports={}

commonjs 由包和描述文件构成
- package.json 描述文件
- bin 可执行的二进制文件
- lib js代码
- doc 文档
- test 单元测试

npm package管理
- npm --registry https://registry.npm.taobao.org install axios --save
- cnpm 直接从淘宝下载
- node引入模块的时候，会先从node_modules中寻找合适的包，没有就从上级目录寻找


buffer 缓冲区
- buffer的结构和数组很像，操作方法也类似数组
- 数组中不能存在二进制数据的文件，buffer可以存储二进制数据,显示时候是16进制 
- 范围是从00 - ff
- 创建一个10进制的数据 `Buffer.from(str)` `toString()`可以将缓存区中的数据转成字符串
- 创建一个10进制的数据 `Buffer.alloc(10)`
- 创建一个置顶大小的 `allocUnsafe(10)`里面可能是敏感数据

fs 文件系统  
- `var fs = require('fs');` 引入不需要下载
- `sync` 异步
- 同步 `readFile `,可以回调函数里去处理返回值
- 流式文件写入 文件过多 占用内存太多系统开销太大 
```js
 //创建一个可写流 
var ws = fs.createWriteStream('./1.txt');
//绑定一个一次行事件 创建一次后自动失效 
ws.once("open",()=>{
    console.log("open")
})
ws.write("通过可写流写入文件内容",(error)=>{
    if(error) console.log(error); 
})
//流式需要end关闭
ws.end()
ws.once("close",()=>{
    console.log("close")
})
```

vm 模块使用 模块加载
- path 里的文件 内容 `var age = 'hello world'`
- evla 函数可以直接运行代码 `eval(let content = fs.readFileSync('path','utf-8'));`
- 或者创建函数 `new Function('age','return age+1')`
- 使用`VM`机制 `vm.runInThisContext(content)`  _Return:hello world_


EventEmitter /enents 事件管理/驱动
- on:事件触发糊掉 
- emit 触发事件 
- once 
- off 移除监听

```js
cosnt Events = require('events')
const ev = new Events()
ev.on('事件'，()=>{})
ev.emit('事件')
```

push/sub 订阅/发布

- 缓存队列，存放订阅信息
- 状态改变通知订阅者执行监听

```js
class PubSub{
  constructor(){
    this._events ={}
  }

  //注册
  subscribe(event,classback){
    if(this._event[event]){
      //如果当event存在，所以我们只需要往后添加档次监听操作
      this._events[event].push(callback)
    }else{
      //之前没有订阅过此事件
      this._event[event] =[callback]
    }
  }
  //发布操作
  publish(event,...args){
    const items = this._events[event]
    if(items && items.length){
      items.forEach(function(callback){
        callback.call(this,...args)
      })
    }
  }
}
```