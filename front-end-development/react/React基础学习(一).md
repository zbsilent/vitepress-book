# REACT基础01

[toc]

## React学习

[![](https://gitee.com/zbsilent/imag/raw/master/root/github.svg)![img](https://img.shields.io/badge/React-zbsilent-brightgreen)](https://github.com/zbsilent)



> React学习angular （google） 、react（facebook）、vue（中国）区别书写格式 jsxreact 开发模式第二课回顾组件开发显示隐藏小测试小时钟时间加减事件对象获取非本身（事件源元素）拖拽生命周期Reactreact表单和前后台数据交互tab面板 选项卡百度下拉WebPack配置react项目学习webpack组成基础配置对象导入导出React-JSX在webpack中的支持预设 .babelrc 新建这个文件配置react如何在服务器上使用生产环境 -webpack -w开发环境 webpack-dev-server



### angular （google） 、react（facebook）、vue（中国）区别



原生JS本身操作dom消耗性能

库和框架是一个意思么？

库是对原生js的高度封装 jquery/zerpto

框架 ： 本质上修改了js的思想 解决了一些终端程序上的问题



### 书写格式 jsx

单个标签

```text
let a= <div>hello react!</div>
```

多个标签

```text
let a = <div><div>asdfa</div><span>adsfa</span></div>
```

可以自由缩进、允许加括号

```text
let a = <div>
          <div>sasdfa</div>
          <span>test</span>
        </div>
```

单标签规则 - 必须闭合

```text
<img/>
```

class - className

```text
<div class ='aaa'></div> 
<div className='aaaa'></div>
```

jsx里使用js代码

```text
var a ='hello react!';
let b =<div>{a}</div>
```

### react 开发模式

1.直接引入 - 简单

```text
<script src ='react.js'></script>
```

2.脚手架模式 基于webpack

react.js - 核心js

react-dom.js - 虚拟dom

babel ？ jsx 

> babel的作用 ES6->ES5 JSX转JS

bower - js所有的框架库包管理器

```text
npm install bower - g

bower info （信息）
      install （安装）

bower info react 默认最高版本
#15.6.1 指定版本
```

```text
npm install -g create-react-app

create-react-app react_test
```

采用引用的方式 react.development.js react核心库

```text
<html>
<head>
    <meta charset="utf-8">
    <script type="text/javascript" src='/Users/zbsilent/bower_components/react/react.development.js'></script>
    <script type="text/javascript" src='/Users/zbsilent/bower_components/react/react-dom.development.js'></script>
    <script type="text/javascript" src='/Users/zbsilent/bower_components/babel/browser.js'></script>
</head>
<body>
  <div id='app'></div>

  <script type="text/babel">
    let a = <h1>hello recat!</h1>
    ReactDOM.render(
    a,
    document.getElementById('app')
    )
  </script>
<body>
</html>
```

引用js代码用{}

```text
  <div id='app'></div>

  <script type="text/babel">

    var b = 'hello world'
    let a = <h1 className='leo'>hello recat! {b}</h1>
    ReactDOM.render(
    a,
    document.getElementById('app')
    )
  </script>


<div id='app'></div>

  <script type="text/babel">
    var imgSrc = 'https://www.baidu.com/img/bd_logo1.png'
    var b = 'hello world'
      var c ='leo'
    let a = (<div><!--这必须用闭合标签-->
              <img src={imgSrc}/><!--这里用花括号-->
              <h1 className={c} style={{'background':'green'}}>hello recat! {b}<!--第一层要使用js代码--></h1>
             </div>)
    ReactDOM.render(
    a,
    document.getElementById('app')
    )
  </script>
```

支持使用style - 里面说过json

```text
<h1 className='leo' style={{'background':'green'}}>hello recat! {b}</h1>
```

第一层告诉jsx我用使用js 第二层是json的

```text
事件
```

使用驼峰命名法 单词首字母大写 第一个单词之后的首字母大写

onClick - &gt; onClick





### 第二课

#### 回顾

ReactDOM.render\(jsx\(组件、内容\)、放到哪\)

```text
面向对象
<script>
    function show(){
      console.log(this);
    };
    // console.log(typeof new show())
    //show();//this 指向window
    //new show();//this 指向本身
  </script>
```

类 constructor

原型 - prototype（所谓的方法）

原型链 **proto**

```text
React面向对象
```

constructor - 默认执行的函数

不支持变量提升

```text
class Leo{
        constructor(name){
          this.name = name;
          //默认执行 比如私有属性 默认传参
          alert(name)
        }
        //原型
        show(x){
          console.log(this.name)
          //alert(x)
        }
    };
    //console.log(typeof leo)
    new Leo('liqiaang').show('m');
```

class 函数名称

函数调用时 默认执行 constructor函数

constructor - 里面写一些初始的内容

原型就是和constructor同级的函数即可

```text
  class Small extends Leo{
      constructor(x){
        super(x);
        this.aaa = 20;
      }
    }
```

继承 extends 继承原型和私有属性

如果子类想使用this 必须使用super

### 组件开发

```text
class Leo extends React.Component{
    render(){
      return <div>hello react!</div>
    }
  }
  ReactDOM.render(<Leo/>,app)
class 自定义名 extends React.Component {
    render(){
        return (要渲染的内容)
    }
}
```

es6+jsx语言

标签 属性 参数

组件首字母必须大写

使用props获取参数

```text
  class Leo extends React.Component{
    render(){
      console.log(this);
      return (<div>
                <input type='button' value='改变' onClick={this.show}/>
                <br/>
                <span>hello react!</span>
                <h1>{this.props.value}</h1>
              </div>)
    }
    show(){
      //alert(1);
      console.log(this);
            //这里this必须得指向render里去
    }
  }
  ReactDOM.render(<Leo value='12'/>,app)
```

目前这里的this指向是这里

![image-20210309160408532](https://github.com/zbsilent/zbsilentBooks/tree/471583cbb65049920e9882378478a6388d57e9ae/Users/zbsilent/Library/Application%20Support/typora-user-images/image-20210309160408532.png?lastModify=1616469479)

**改变this指向**

```text
  function show(...val){
    //this.prototype.k = 10 ;
    console.log(val)
  };
  show.call(String,1,2,3,4,5,6);
  console.log('asd'.k);
  </script>
```

1.call

* 1.第一个参数可以改变函数的this
* 2.从第一个参数之后的参数就是对应函数的形参
* 3.函数会默认直接调用

2.apply

* 1.第一个参数可以改变函数的this
* 2.从第一个参数之后的参数就是数组对象
* 3.函数会默认直接调用

3.bind

* 1.第一个参数可以改变函数的this
* 2.从第一个参数之后的参数就是数组对象
* 3.函数不会默认直接调用

![image-20210309162127140](https://github.com/zbsilent/zbsilentBooks/tree/471583cbb65049920e9882378478a6388d57e9ae/Users/zbsilent/Library/Application%20Support/typora-user-images/image-20210309162127140.png?lastModify=1616469479)

![image-20210309162028465](https://github.com/zbsilent/zbsilentBooks/tree/471583cbb65049920e9882378478a6388d57e9ae/Users/zbsilent/Library/Application%20Support/typora-user-images/image-20210309162028465.png?lastModify=1616469479)

props 只能读、不能写

state去改变、初始化环境去改变，即构造函数里

数据可渲染

* json 改变数据的方式 不会进行渲染
* setState view层进行渲染

```text
class Leo extends React.Component{
    constructor(){
      super();
      this.state = {
        msg:'hello react'
      }
    }
    render(){
      console.log(this);
      return (<div>
                <input type='button' value='改变' onClick={this.show.bind(this)}/>
                <br/>
                <span>{this.state.msg}</span>
                <h1>1111</h1>
              </div>)
    }
    show(){
      this.setState({
        msg:'chanege'
      })
    }
  }
  ReactDOM.render(<Leo/>,app)
```

### 显示隐藏小测试

```text
  class Title extends React.Component{
    constructor(){
      super();
      this.state = {
        show:'block'
      }
    }
    render(){
      return (<div>
                <input type='button' value='切换' onClick={this.change.bind(this)}/>
                <br/>
                <div className='div' style={{display:this.state.show}}></div>
              </div>)
    }
    change(){
      this.setState({
        show:this.state.show == 'block'?'none':'block'
      })
    }
  }
  ReactDOM.render(<Title/>,app);
```

#### 小时钟

```text
  class Clock extends React.Component{

    constructor(){
      super();
      this.state = {
        time : new Date()
      }
      //定时器 箭头函数指向不会出问题
      setInterval(()=>{
         this.setState({
           time : new Date()
         })
      },1000)
     }
    // <h1>{this.props.time.toLocaleDateString()} {this.props.time.toLocaleTimeString()}</h1>

    render(){
       return (<div>
        <h1>{this.state.time.toLocaleString()}</h1>
        </div>)
    }
  //
  }
  //
  // ReactDOM.render(<Clock time={new Date()}/>,app);
  ReactDOM.render(<Clock/>,app);
```

#### 时间加减

```text
class NumberNode extends React.Component{

    constructor(){
      super();
      this.state = {
        number: 0
      }
     }

    render(){
       return (
         <div>
            <input type='button' value ='-' onClick={this.last.bind(this)}/>
            <div>{this.state.number}</div>
            <input type='button' value='+' onClick={this.next.bind(this)}/>
         </div>
       )
    }

    last(){
      this.setState({
        number: this.state.number == this.props.min?Number(this.props.min):this.state.number- 1
      })
    }
    next(){
      this.setState({
        number: this.state.number == this.props.max?Number(this.props.max):this.state.number + 1
      })
    }
  }

  ReactDOM.render(<NumberNode min='0' max='15'/>,app);
```

#### 事件对象获取非本身（事件源元素）

```text
<input type='text' onInput={this.change.bind(this)} id= 'inputNode' ref='leo'/>
```

```text
 document.onClick = function a(e) {
    // body...
    console.log(e.target)
  }
```

* target 指向事件源 

```text
change(e){
      //console.log(e.target.value) //获取本身事件源头
      console.log(this.refs.leo.value) //react封装的方法
      this.setState({
        msg:document.getElementById('inputNode').value //js原生
      })
    }
```

#### 拖拽

```text
*{margin:0;padding:0;}
     .dragNode{width:200px;height:300px;background:blue;position:absolute;}

class Drag extends React.Component{
    constructor(){
      super();
      this.state ={
        needX :10,
        needY:0
      }
      this.disX = 0 ;
      this.disY = 0;

    }

    render() {
      return (
        <div className='dragNode' style={{left:this.state.needX,top:this.state.needY}} onMouseDown={this.fnDown.bind(this)}></div>

      )
    }

    fnDown(e){
      console.log(e.clientX,e.target.offsetLeft)
      this.disX = e.clientX  - e.target.offsetLeft;
      this.disY = e.clientY  - e.target.offsetTop;
      document.onmousemove = this.fnMove.bind(this);
      document.onmouseup = this.fnUp.bind(this);
    }

    fnMove(e){
      this.setState({
        needX : e.clientX - this.disX,
        needY : e.clientY - this.disY
      })
    }
    fnUp(){
      document.onmousemove = null;
      document.onmouseup = null;
    }

  }

  ReactDOM.render(<Drag/>,app)
```

#### 生命周期React

react Component 通过定义了几个函数控制各个阶段的动作

* componentWillMount 组件挂载前（组件渲染前） 属性状态允许使用 找不到元素
* componentDidMount 组件挂载后 （组件渲染后）属性状态允许使用 可以找到元素
* componentWillUpdate 组件更新前  属性状态允许使用 找不到元素
* componentDidUpdate
* componentWillUnmount 组件卸载前  

事件冒泡

阻止冒泡。

* e.cancelBubble = true; 
* e.stopPropagation\(\); 
* return false;
* e.nativeEvent.cancelBubble = true 

原生事件对象

* e.nativeEvent.stopImmediatePropagation\(\); 立刻停止传播

```text
x  class Reno extends React.Component{
          constructor(){
              super();
              this.state ={
                  msg:'hello'
              }

          }
          componentWillMount(){


              console.log('挂载前')
          }
          componentDidMount(){
              // console.log(document.querySelector('#div1'))
              // console.log(this.props,this.state)

              console.log('挂载后')
          }

          componentWillUpdate(){

              console.log('更新前',this.props,this.state);
              //debugger;
          }

          componentDidUpdate(){
               console.log('更新后',this.props,this.state);
           }

          componentWillUnmount(){
                  console.log('卸载');
          }

          show(e){
              this.setState({
                  msg:Math.random()
              });
              //e.cancelBubble = true;
              //e.stopPropagation();
              //return false;
              console.log(e.nativeEvent);
              e.nativeEvent.stopImmediatePropagation();
          }
          render(){
              return(
                  <div>
                      <input type='button' value='点击' onClick={this.show.bind(this)}/>
                      <div id='div1'>{this.state.msg}

                  </div></div>
              )
          }
      }

      ReactDOM.render(<Reno/>,app);

      document.onclick = function(){
          ReactDOM.render(<h1>asdfa</h1>,app);

      }
```

#### react表单和前后台数据交互

放在form里的就是表单 受控组件/非受控组件

```text
  <input type='text' value='' ref='val1'/>  <!-- value=''受控组件 -->
```

改变成非受控组件，增加默认值

```text
  <input type='text' defaultValue='123' ref='val1'/>

  <input type='checkbox' checked/> <!--checked导致受控-->
  <input type='checkbox' defaultChecked/> <!--checked导致受控-->
```

* angular -$http
* Vue - re....
* react - jquery/zepto/axios/fetch/ajax...

  虚拟dom每个内容都必须要有自己的唯一标识

  ```text
  npm i express
  ```

```text
  const express = require('express');
  const server = express();

  server.listen(2812);

  server.use('/get',(req,res)=>{
    res.send(['china','japan','ruishi'])
  })

  server.use(express.static('./'))
```

ajax

```text
  class Frorms extends React.Component {

          constructor(){
              super();
              this.state = {
                  // arr:['中国','俄罗斯','巴基斯坦','印度']
                  arr:[]
              }
          }

          componentWillMount(){
             // setTimeout(function(){
                  //  this.setState({arr:['china']})
               // }.bind(this),1000)
               this.ajaxToData();
          }
          ajaxToData(){
              let oAjax = new XMLHttpRequest();
              oAjax.open('GET','http://localhost:2812/get',true);
              oAjax.send();
              oAjax.onload = function(){
                  if(oAjax.status == 200){
                      //console.log(oAjax.responseText);
                      let json = eval('('+oAjax.responseText+')');
                      console.log(json);
                      this.setState({
                          arr:json
                      })
                  }
              }.bind(this);
           }
          render(){
              let arrLi = [];
              this.state.arr.forEach((item, i) => {
                  console.log(i,item);
                  arrLi.push(<li key={i}>{item}</li>)

              });
              console.log(arrLi);
              return(<div>
                  {/* <input type='text' defaultValue='123' ref='val1'/>
                  <br/>
                  <input type='checkbox' defaultChecked defaultValue='ssh'/> */}
                  <div style={{display:this.state.arr.lenght>0?'none':'block'}}>暂时没有数据</div>
                  <ul>
                      {arrLi}
                  </ul>

              </div>)
          }
      }
      ReactDOM.render(<Frorms/>,app);
```

函数调用组件

{函数名\(\)}

组件：深度重复调用

组件嵌套

```text
  <Child msg={父组件数据}/>

  {/*子组件获取父组件 */}
  this.props.msg
  {/*默认情况下 父组件从新渲染 会统一同步
  不想同步就存成state*/}
```

```text
  class Child extends React.Component{
          constructor(){
              super();
              this.state={
                  msg:'我是子组件数据'
              }

          }
          componentWillMount(){
              console.log(this.props);
              this.props.getMsg(this.state.msg);
          }
          render(){
              // return <div style={{color:this.props.textColor}}>我是子组件=>{this.props.setMsg}</div>
              return <div style={{color:this.props.textColor}}>我是子组件=>{this.state.msg}</div>
          }
      }
      class Parent extends React.Component{
          constructor(){
              super();
              this.state={
                  msg:''
              }

          }

          show(v){
              console.log(v);
              this.setState({
                  msg:v
              });
          }
          render(){
              return (    <div>
                      <div >我是父组件=>{this.state.msg}</div>
                      <Child textColor={'rgb('+parseInt(Math.random()*256)+',242,232)'}
                      getMsg={this.show.bind(this)}/>
                      {/*这里的this首先指向的是子组件，不是父组件，bind必须指向会父组件*/}
                  </div> )
          }
      }
      ReactDOM.render(<Parent/>,app)
```

```text
  <Child fn={父组件的一个函数.bind(this)};
  子组件里面执行函数
  this.props.fn(传入子组件数据)
```

#### tab面板 选项卡

上面的按钮

下面的div

自动选项卡

```text
  tabJson={
      topValue:['aaa','bb'],
    bottomValue:['',''],
    timer:2000
  }
```

```text
  <html>
  <head>
      <meta charset="utf-8">
      <script type="text/javascript" src='/Users/zbsilent/bower_components/react/react.development.js'></script>
      <script type="text/javascript" src='/Users/zbsilent/bower_components/react/react-dom.development.js'></script>
      <script type="text/javascript" src='/Users/zbsilent/bower_components/babel/browser.js'></script>
  <style>
      .myDiv{width:200px;height:200px;border:1px solid black;}
      input.active{background:red}
  </style>
  </head>
  <body>

    <div id='app'></div>
    <script type="text/babel">
      class TopNode extends React.Component{

          show(e){
              this.props.ChildFn(e.target.getAttribute('data-ux'));
          }

          render(){
              // 循环处理
              let oInput = [];
              this.props.topValueArr.forEach((item, i) => {
                  oInput.push(<input type='button'
                      className={i==this.props.myIndex?'active':''} value={item} key={i} onClick={this.show.bind(this)} data-ux={i}/>)
              });
              return (
                  <div>
                      <div>{oInput}</div>
                  </div>
              )
          }
      }
      class BottomNode extends React.Component{

          render(){
              let oDiv = [];
              this.props.json.bottomValue.forEach((item, i) => {
                  oDiv.push(<div className='myDiv' style={{display:i==this.props.myIndex?'block':'none'}} key={i}>{item}</div>)
              });
              return (
                  <div>
                      <div>{oDiv}</div>
                  </div>
              )
          }
      }
      class Tab extends React.Component{
          constructor(){
              super();
              this.state={
                  index:0,
                  timer:null
              }
          }
          componentDidMount(){
               this.AutoPaly();
          }
          // 子级控制父级
          change(v){
              console.log(v)
              this.setState({
                  index:v
              })
          }
          MouserOverFn(){
              clearInterval(this.timer)
          }
          AutoPaly(){
              clearInterval(this.timer);
              this.timer = setInterval(()=>{
                  let index = this.state.index;
                  index++;
                  index == this.props.tabJson.topValue.length && (index=0)

                  this.setState({
                      index:index
                  })
              },this.props.tabJson.timer)
          }
          MouserOutFn(){
              this.AutoPaly();
          }
          render(){
              console.log(this.props.tabJson);
              return (
                  <div onMouseOver={this.MouserOverFn.bind(this)} onMouseOut={this.MouserOutFn.bind(this)}>
                      <TopNode topValueArr={this.props.tabJson.topValue} myIndex={this.state.index} ChildFn={this.change.bind(this)}/>
                      <BottomNode json={this.props.tabJson} myIndex={this.state.index}/>
                  </div>
              )
          }
      }

      ReactDOM.render(<Tab tabJson={{'topValue':['中国','瑞士','新西兰'],'bottomValue':['很强大，最棒','银行不错','黄精不错'],timer:2000}}/>,app);

      </script>
  <body>
  </html>
```

#### 百度下拉

百度jsonp 搜索

[https://www.baidu.com/s?wd=3&rsv\_spt=1&rsv\_iqid=0xa662e5260004cb29&issp=1&f=8&rsv\_bp=1&rsv\_idx=2&ie=utf-8&tn=baiduhome\_pg&rsv\_enter=0&rsv\_dl=tb&rsv\_sug3=1&rsv\_sug1=1&rsv\_sug7=100&rsv\_btype=i&prefixsug=%2526lt%253B&rsp=0&inputT=2784&rsv\_sug4=2785](https://www.baidu.com/s?wd=3&rsv_spt=1&rsv_iqid=0xa662e5260004cb29&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_dl=tb&rsv_sug3=1&rsv_sug1=1&rsv_sug7=100&rsv_btype=i&prefixsug=%26lt%3B&rsp=0&inputT=2784&rsv_sug4=2785)

#### WebPack配置react项目

* 下载node
* webpack是node的一个包

  ```text
  npm i webpack-cli -g
  cnpm(npm) i(install) webpack -g
  cnpm i webpack-dev-server -g
  ```

  **学习**

  ```text
  https://webpack.js.org
  ```

**webpack组成**

* 入口、出口
* loader\(加载器，转化器\)
* plugin

**基础配置**

需要一个配置文件 webpack.config.js

配置webpack的具体内容

```text
  # 切换到目录下
  /User/....
  touch webpack.config.js 
  touch index.js
  touch index.html
  # 
  webpack
   webpack --mode development
   webpack --mode production
  #持续监听&打包

  webpack -w(watch) 
  #压缩打包
  webpack -p
  #持续监听 压缩打包
  webpack -pw
```

创建文件

```text
  module.exports = {
    entry:'.index.js', # 入口
    output:{
      filename:'bundle.js'# 出口文件
    }
  }
```

```text
  <!--引入打包后的文件-->
  <script src='bundle.js'/>
```

```text
  index.js
  alert(1);
```

运行webpack 在webpack.config.js的文件夹下 打包一次

**对象导入导出**

```text
  # 自动支持ES6语法
  import {a,b} from './' #当前文件目录下
  # 支持别名
```

```text
  touch a.js
```

```text
  export const a = 12;
  export const b = 3;
  # 支持别名写法
  const a= 12;
  const b =12;
  export{a as nnum ,b}
```

直接全部导出

```text
  import json from '/a.js'

  console.log(json.a,json.b)
```

```text
  export default{
    a:5,
    b:54
  }
```

```text
  #导入
  import json,{a,b,c} from './a'
  console.log(json.a)
  console.log(json.b)
  console.log(a)
  #导出
  const a = 10;
  const b = 10;
  const c = 10;
  exprot default{
      a:'hello',
    b:'ttest'
  }
```

[webpack组成](react.md#webpack组成)

```text
  # loader 认识对象
  # webpack 指着对本身，必须用加载器 转换器
  require('./index.css')
```

```text
  npm init -y
  #下载模块
  npm install style-loader -D
  npm install css-loader -D
```

```text
  {
    "name": "react-webpack",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "style-loader": "^2.0.0"
    }
  }
```

```text
  module.exports = {
    mode: 'development',
    entry:'./index.js',
    output:{
      filename:'bundle.js'
    },
    module:{
      rules:[{
        #正则表达
        test:/\.css$/,
        #这里注意不可以加载反了 从右往左
        use:['style-loader','css-loader']
      }
      ]
    }
  }
```

[![img](https://img.shields.io/badge/zbsilent-yonyou-red)](Https://github.com/zbsilent)

**React-JSX在webpack中的支持**

`babel-core`

`babel-loader`

`babel-preset-es2015`

```text
  # 配置bable
  npm install babel-core babel-loader@7.1.5 babel-preset-es2015 -D
  # -D是为了加入到配置文件中
```

![image-20210319185818217](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210319185818217.png)

#### 函数式组件总结

> 函数式组件里没有this

[代码示例](https://codesandbox.io/s/compassionate-johnson-9hpni?file=/src/index.js)

#### ref回调形式

```markup
<script type='text/javascript'>
  showInfo =()=>{
    const {input1} = this;
    alert(input1.value)
    }
  <input ref={fun => {tthi.input1 = fun}} type='text'/>
    <button onClick={this.showInfo}>click me</button>
</script>
```

#### 回调REF的调用次数

```markup
<script type='text/javascript'>
  showInfo =()=>{
    const {input1} = this;
    alert(input1.value)
    }
  {/*内联函数 更新过程中会被执行两次 第一次是null*/}
  <input ref={fun => {tthi.input1 = fun}} type='text'/>
    <button onClick={this.showInfo}>click me</button>
</script>
```

```markup
<script type='text/javascript'>

  saveInpt =(fun)=>{
    this.input1 = fun;
    console.log('@',fun)
  }

  <input type='text' ref={this.saveInput}/>
</script>
```

#### createRef

```markup
<script type='text/javascript'>
  //返回一个容器，存储被ref标识的节点 专人专用
  myRef = React.createRef();

  mouseOver(){
    console.logg(this.myRef.current.value);
  }

  <input type='text' ref={myRef} onMouseOver={this.mouseOver.bind(this)}/>
  {/*这里会覆盖上面的*/}
  <button type='text' ref={myRef} onMouseOver={this.mouseOver.bind(this)}/>


</script>
```

#### 事件委托

> on,,, 都是事件委托的形式去处理的 事件冒泡
>
> event.trarget得到发生事件的DOM元素

`清不要过度使用REF,发生事件和操作DOM为同一个元素`

```javascript
mouseOver(event){
    console.log(this.event.target.value)
}
<button type='text' onMouseOver={this.mouseOver.bind(this)}/>
```

```javascript
import { useRef, useState } from "react";
const LoginComponents = () => {
    const [loginfo, setLoginfo] = useState({ username: "", password: "" });
    // const myNameRef = useRef();
    // const myPassRef = useRef();
    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefalut();
        //event.preventDefalut(); //阻止表单提交
        // console.log(myNameRef,myPassRef);
        console.log(`你输入的用户名是：${loginfo.username},你输入的密码是：${loginfo.password}`);
    };


    const saveUsername = (event) => {
        console.log(event.target.value);
        setLoginfo({ ...loginfo, ["username"]: event.target.value });
    };

    //这里用到了动态设置useState的值的方法
    const savePasswd = (event) => {
        console.log(event.target.value);
        setLoginfo({ ...loginfo, ["password"]: event.target.value });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                用户名:
                <input onChange={saveUsername} type="text" name="usernam" />
                密码:
                <input onChange={savePasswd} tpye="password" name="password" />
                <button>登陆</button>
            </form>
        </div>
    );
};
export default LoginComponents;
```

`随着输入输入到state为受控组件`

```typescript
          {/* 
        const saveFormInfo = (param) => {
            return (event) => {
                //这里必须使用[] 拿去变量
                setLoginfo({ ...loginfo, [param]: event.target.value });
            };
        };

    */}
    const saveFormInfo = (param) => (event) => {
        // console.log(event.target.value);
        setLoginfo({ ...loginfo, [param]: event.target.value });
    };

    <input onChange={saveFormInfo('username')} tpye="password" name="password" />
```

`注意这里用[]取值`

#### 高阶函数

> * 若A函数接受参数为函数，则A为高阶函数
> * 若A调用的返回值依然是函数，那A为高阶函数

#### 函数柯里化

> * 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

```javascript
function sum(a){
    return(b)=>{
        return (c)=>{
        return a+b+c
    }
  }
}
const result = sum(1)(2)(3);
```

#### 再探组件生命周期

\`\`

![image-20210325220515149](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210325220515149.png)

`ComponentWillMount`$\rightarrow$`Render`$\rightarrow$`ComponentDidMount`$\Longrightarrow$`ComponentWillUpdate`$\rightarrow$`Render`$\Longrightarrow$`ComponentDidUpdate`$\Longrightarrow$`ComponentDidUnmount`

### React 新旧生命周期

!\[react生命周期\]\([https://raw.githubusercontent.com/zbsilent/imag/main/rootreact%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F\(%E6%97%A7\).png](https://raw.githubusercontent.com/zbsilent/imag/main/rootreact%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%28%E6%97%A7%29.png)\)

```markup
* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.
```

> * `componentWillMount`
> * `componentWillReceiveProps`
> * `componentWillUpdate`
>
> 使用过程必须增加 UNSAFE\_
>
> @17.x 删除`componentWillMount`，`componentWillReceiveProps`和`componentWillUpdate`。提出 `getDerivedStateFromProps`,`getSnapshotBeforeUpdate`

!\[react生命周期\]\([https://raw.githubusercontent.com/zbsilent/imag/main/rootreact%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F\(%E6%96%B0\).png](https://raw.githubusercontent.com/zbsilent/imag/main/rootreact%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%28%E6%96%B0%29.png)\)

#### getDerivedStateFromProps

`即state的值在任何时候都取决于props`

```javascript
//不应该给实例哟过 所以是静态的
static getDerivedStateFromProps(props) {
    console.log("----衍生");
    console.log(props);
    //适用于罕见用例 state的值都取决于props
    //影响状态  并且已这个为主 且保持不变
    //return {count:80}; 接受到props
    //派生状态 这里只能返回状态对象
    return props;
}
```

![image-20210326135317074](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210326135317074.png)

![react-redux&#x6A21;&#x578B;&#x56FE;](https://raw.githubusercontent.com/zbsilent/imag/main/rootreact-redux%E6%A8%A1%E5%9E%8B%E5%9B%BE.png)





