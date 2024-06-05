---
tags:
  - 查看原型
  - 箭头函数
  - this指向
---

# ES6

_Reference_:_es2015的缩写_

![](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/GitBook-zbsilent-brightgreen)

```jsx
{/*块状作用域 以前都是function为作用域*/}
{
  alert(1);
}
{/*let 变量不允许重复申明 */}

let time = 10;

let time = function(){} 

{/*可以重复赋值*/}
time = 20 
{/*变量泄漏*/}
for(var i =0; i< 10;i++){ 
};
consol.log(i)
{/*可以讲i定义为let*/}
```

```jsx
{/*这个是常量 不允许赋值、重复申明*/}
const a = 10 ;
console.log(a);
```

```javascript
{/*charcodeAt 获取ecoding 编码 多少进制的 比如2232*/}
let a = 'asd';
console.log(a.charCodeAt(0 ));
String.fromCharCode()
'\u4e00 - \u9fa5'
for(let i = 0x4e00;i<0x9fa5;i++){
  19688~40865
}
```

```jsx
{/*无法在上方调用*/}
函数名 x = 参数 => 或者执行
x = x => x

var x = function(x){
  return x;
}

show=()=> {}

function(x){
  console.log(x)
}
[1,2,3].find(x=>{console.log(x)})

document.onclick = function(){document.body.style
  .background = 'black'}
document['onclick']=()=>{document.body.style
  .background = 'black'}
```

```jsx
{/*匿名函数*/}
(function(){

Alert(1)

})()
let x = 10;
((x)=>{alert(x)})()
```

```jsx
{/*延展参数 可以延展任何类型*/}

function show(x=5,y=3){
  console.log(x)
};
show();
> 参数默认default 为5
var obj ={a:3}
function show{x={a:5,b:5}){
  console.log(x)
};
show(obj);
show'obj'
> 参数为obj
```

```jsx
/*扩展运算符 ...箭头函数没有arguments*/
show=()=>{
  console.log(arguments)
}
show``;

show( ){
  console.log(arguments)
}
show()
> 
show(1,2,3,4)
>1,2,3,4
show(...x){
  console.log(x)
}
>[1,2,3,4]
show(y,...x){
  console.log(x)
}
>1,[2,3,4]
{/*函数中的参数用 代表实参为数组 进来的x变量*/}
var a =[1]
var b =[2]
var c =[3]
cconsole.log(a.conncat(b.concat(c)));

cconsole.log(a.conncat(b.concat(c)));
{/*合并数组*/}
cconsole.log([...a,...b,...c]);

let a = `<div></div>`
doccument.write(a.repeat(5));

console.log([...document.querySelectorAll('div')])
```

```jsx
<style>
  div{display:none;width:200px;heigth:200px;background:#ccc}
  div:first-of_type{
    display:block
  }
</style>
<input vaule='1' type='button'/>
<input vaule='2' type='button'/>
<input vaule='3' type='button'/>
<div>aaa</div>
<div>bbb</div>
<div>ccc</div>


[...document.querySelectorAll('inpnt')].find((x,y)=>{
  x['onclick']()=>{
    [...document.querySelectorAll('div')].find(d=>{
      d.style.display='none';
    });
    [...document.querySelectorAll('div')].[y].style.display='block';
  }
})
```

```jsx
{/*生成器函数 function* 函数名() */}
function show(){
  alert(1)
};
show()

&
function* show(){
  alert(1)
};
> show不可以用了 

需要用 show.next() 使用生成器函数 函数只有1个return 
                  生成器可以不断next  不叫return 叫做yield


function* show(){
  yield function(){
    alert(1);
  };
  yield function(){
    alert(2);
  };
  yield() =>{
     alert(3);
  }
};
var k = show();
k.next().value() #第一个
k.next().value() #第二个
document.onclick = x=>{
  k.next().value() #第三次
}
```

```javascript
json ={a:2,b:2,c:3}

json ={};
json={
  a(){
    console.log(1);
  }
}
json.a();

> 1
get/set

json = {
   set Reno(a){
     console.log(a)
   },
      get Reno(){
      console.log(2)
    }
};
> json.Reno = 1;# 不赋值，走get 给值走set
```

> 1996年 es1诞生 网景浏览器 支持es1 提出了javascript支持 actioncript - &gt;flash
>
> 1997 年 es2 ie6 支持 网景支持 浏览器大战
>
> 1998年 es3 火狐不支持 其他支持
>
> 2007年 es4 激进 无法支持
>
> 2008年 es3.1 退化版 html5
>
> 2009年 es5草案
>
> 2010年 es5通过
>
> 2011年 es6草案
>
> 2013年 es6通过
>
> 2014年 chrome30% html 全面支持
>
> 2015年 es6 chrome 60% 火狐30%
>
> 2016年 es6 chrome 60% +
>
> node.js

es6 $\rightarrow$ es2015 $\longrightarrow$ecma

```javascript
{/*封装jqery*/} ECMAscipt->ecma/es
测试
```

> 块级作用域

```markup
<script type='text/javascript'>
  {/*
      var i = 0
  */}
  {
    let allInput = document.getElementsByTarName('input')；
    for(let i = 0;i<allIput;i++){
      allIput[i].onclick = function{
         console.log(i);
      }
    }
  }
</script>
```

> 结构赋值 前后结构一致即可

```javascript
<script type='text/javascript'>
    let [a,b,c] = [10,20,30]
    console.log(a,b,c)
    let [a,[b,d],c] = [10,[20,21],30]
</script>
```

> Json {key对应key}

```javascript
var json ={'a':20,'b':30}

let {a,b} = json;
```

> 传参

```javascript
function show (x=[30,50,10]){
  console.log(a)
  var b = a[0];
  # let [b,c,d,e] = a
};
show([20,21])
```

```javascript
var data = {
  'ok':1,
  'data':{

  },
  'mis':'请求成功'
}
if(data.ok == 1){

}
let (ok,data,mis) = data
```

### bind

> 任何函数都可以用call调用自己 call的第一个参数就是函数的\`this\`,第二个参数是函数的\`形参\`

```javascript
function show(){
  console.log(this) > window对象
}
show.call(1)  > 1 对象本身
show.call(1,2) > 2

alert.call(whindow,1) > 1
setTimeOut.call(window,()=>{
  alert.call(window,1)
},1000);
show.bind(1) #函数本身 没有进行调用 
show.band(1)() #调用时候
```

> 任何函数都可以用call调用自己 call的第一个参数就是函数的\`this\`,第二个参数是函数的\`形参\`,正常不会会自己调用

## 面向对象

### 类

* 通过类找到原型 Array.prototype

![image-20210323141136686](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/rootimage-20210323141136686.png)

* typeof 'asdsda'
  * \[1,2,3\].constructor =&gt; function Array\( \)    {    \[native code\]    }
* call/bind所有方法都通用

![image-20210323141530612](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210323141530612.png)

![image-20210323141822756](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210323141822756.png)

![image-20210323141226630](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210323141226630.png)

### 原型

* prototype  
  * 人 - 手 
  * String - substring/indexof
  * function - call/bind
  * array - concat join

### 原型链

* 继承的 

```javascript
function show(){
  console.log(1)
}
var c = show;
> new c() >> 1
> console.log(c)
> console.log(c.prototype) __proto__  下的东西 就是原型链
```

![image-20210323152414386](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210323152414386.png)

#### es6 class类标准概念

```javascript
<script type="text/javascript">
  class a{
    {/*构造函数*/}
    constructor() { 
      this.x =10; {/*私有属性*/}
      consol.log(this.x);
    }
    ffff(){
      alert('原型->其实就是方法')
    }
  }
  new a();
</script>
```

![image-20210323163117493](https://raw.githubusercontent.com/zbsilent/imag/main/rootimage-20210323163117493.png)

![image-20210323163146412](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/rootimage-20210323163146412.png)

> 支持继承 extends

```javascript
  class a extends aparent{
    constructor(props) {
      //这里用父类属性必须从构造方法super过来
      super(props); 
    }
  }
```

> 箭头函数不改变this指向

### es6jquery

jquery

```javascript
$('div').addClass()
$('')
```

#### css

```javascript
css({'width':'200px','heigth':'300px'})
```

#### 字符串模版深入

**放入函数和传参**

```javascript
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<script type="text/javascript">
  var a = 10;
  var json = {
    'f':'a'
  }
  var stirng = `abc${a}${json.f}`;
  consol.log(string)
</script>

</body>
</html>
```

```javascript
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <script type="text/javascript">
    -function show() {
    +function show(n)
        // body...
        -return `abcdsd`;
        +return n;
      }
      - var string = `showderreturnnis ${show()}` ;
      + var string = `showderreturnnis ${show(n)}` ;
      console.log(string);
  </script>
</body>
</html>
```

> $ showderreturnnis abcdsd

**数组map深入**

> mpa 返回和find/findindex不同，返回一个Array

```javascript
let arr = [1,2,3]
arr.find((x,y,z)=>{
  console.log(x,y,z)
})
```

```jsx
 let arr = ['button', 'text', 'button'];
      var a = arr.map((x, y, z) => {
        var oBtn = document.createElement('input');
        oBtn.type = x.prototype;
        return oBtn;
      });
      console.log(a)
```

**标签模版**

```javascript
  createNode = json =>`<div></div>` {/*相当于括号*/}
  console.log(createNode())
```

```javascript
var jsonData = {
  topValue: ["zbsilent", "vartestt", "wagsdsd"],
  bottomInnner: ["aaaa", "bbbb", "vvvvv"],
};
createNode = (json) => `<div class='outNode'>
${json.topValue.map((v) => `<input type='button' value=${v}></input>`).join('')}
${json.bottomInnner.map((v)=>`<div>${v}</div>`).join('')}
</div>`;
document.body.innerHTML = createNode(jsonData);
console.log(createNode(jsonData));
```



---

### 认识 ES6

- HTML5 标准，JavaScript 是实现

- 目前只有 JavaScript 实现了 ECMA 标准，ECMAScript `like` JS

---

### 声明变量

_x_

#### var 声明

- 可以重复声明
- 无法限制修改
- 没有块级作用域

```html
<scirpt> 
    if(true){ var name ="monkey'; }
    console.log(name)
</scirpt>
```

> 输出：monkey

- 函数闭包中有作用域

```html
<scirpt>
    function myfun{ var name ="monkey'; } 
    console.log(name) 
</scirpt>
```

> 输出：tt is not defined

```html
var btns = document.getElementsByTagName('button'); 
for (var i = 0; i < btns.length; i++) { 
    (function (i) { 
        btns[i].addEventListener('click', function() { 
            console.log(i) })
     })(i)
}
```

* 变量提升

```js
console.log(a)
var a;
```
---
#### let声明

* 块级作用域
```html
{
    let a = 6;
}
let a = 8;
```
> 输出： Identifier 'a' has already been declared
* 不支持变量提升
---
#### const

* 只读，常量值不能改变
* const命令声明对符合类型的数据，指向内存地址
* const需要给常量必须先赋值 对比`let`[<font color="lime">指向对内存地址不可改变</font>](#F01)[_Reference_]

---
#### 箭头函数


```js
function funName(x){
    return x*2;
}
funName(2)
```
> _return_: 4
* 如果没有参数，或者有多个参数需要用()来顶一参数列表
* 如有1个参数可以不用()
* 函数体如果只有一个条语句，可以不用{},retrn会自动增加<sub>[_箭头函数_]</sub> 
::: danger
这里注意this问题，回调函数问题 箭头函数里没有构造器<br/>
普通函数this指向调用者，如果没有调用者,那就指向window<br/>
箭头函数指向箭头函数定义时所处对对象，而不是调用者，默认找父级的this<br/>
<font color="red">综上：箭头函数没有自己的this,它的this是继承而来，默认指向在定义它时所处的对象(宿主对象)</font>
:::
```html
<body>
let arr = [1, 3, 99, 4, 77, 5]

console.log(arr.sort((a, b) => a - b))

arr.sort(function(a,b){
    return a - b;
})
```
> _return_: (6) [1, 3, 4, 5, 77, 99]

```js
<style>
    #box {
        width: 100px;
        height: 50px;
        background: red;
    }

    #box.bgcolor {
        background: yellow;
    }
</style>
<div id="box"></div>
<script>
    console.log("=====")
    const box = document.getElementById('box');

    // box.onclick = function () {

    //     const obj = this; //这里将this指向obj

    //     //setTimeOut是window定义的对象 function函数是由setTimeOut去调用的
    //     setTimeout(function () {
    //         //console.log(this);
    //         obj.className = 'bgcolor'
    //     }, 3000)

    // }

    box.onclick = function () {
        //定义时所处的对象的上一级 this
        setTimeout(() => {
            console.log(this);
            this.className = 'bgcolor';
        }, 3)
    }
</script>
</body>
```

* 简化回调函数
* 表达式简洁
---
#### 数组的高阶用法

* filter 过滤器
* map 映射
* reduce 汇总


```js
<script>
    const map = [30, 50, 80,43,21];
   
    const arry = map.filter(value => value > 40).map(v => v * 0.5).reduce((previousValue, currentValue) => {
        //第一次回调函数的返回值，
        console.log(`第一元素:${previousValue}`, `第二元素:${currentValue}`)
        return previousValue + currentValue;
    })
    //链式编程
    const newArray = map.filter(value => value > 40).map(v => v * 0.5).reduce((previousValue, currentValue) => previousValue + currentValue)

    console.log(arry, newArray)
</script>
```
:::tip
查看原型<br/>
Object.getPrototypeOf(mp)<br/>
.__proto_
:::
---
#### 结构赋值

```js
<script>
    let abc = {
        name: 'li', age: 10, sex: 'nv', tt: {
            car: ['bc', 'bm'],
            w: 'a'
        }
    }
    console.log(abc)
    let { name, age, sex, tt } = abc;
    console.log(tt)
    const { car, w } = tt;
    console.log(name)
    console.log(car)
</script>

```

:::danger
解构赋值这里注意对象必须key同名
:::

---

#### 扩展运算符

```js{10,20}
<script>
    console.log(`...`)
    let arrs = [1, 2, 3]
    //这里相当于把arrs展开后填入对应位置 扩展运算符
    let arra = [19, 20]
    let arrs1 = [...arrs, 7, 8, 9, ...arra]
    console.log(`...${arrs1}`)

    //这里可变参数
    function show(a, b, ...array) {
        console.log(`前两个参数${a},${b}`);
        array.forEach((arr, index) => {
            console.log(`参数变为数组开始循环${index}次，值是${arr}`);
        })

    }
    let unit = [4, 5]
    let uarray = [3, 5, 7, 9]
    //做参数用
    show(...unit, ...uarray)
</script>
```

---

#### 类、JSON

```js{2,13,29,31}
<script>
    //类
    class Person {
        //构造方法
        constructor(name, sex) {
            this.name = name;
            this.sex = sex;
        }
        toString() {
            return `${this.name}-${this.sex}`
        }
    }
    //支持继承
    class Student extends Person {
        constructor(name, sex, age) {
            super(name, sex);
            this.age = age;
        }
    }
    const stu = new Student('张三', '男', 18);
    const per = new Person('李强', '男');

    console.log(x, y)
    console.log(stu.toString())
    //对象 变量和值一样可以省略
    let x = "x坐标";
    let y = "y坐标"
    let jsonObj = { x, y }
    //字符串 串行化字符串
    console.log(JSON.stringify(jsonObj))
    //反串形化
    console.log(JSON.parse(JSON.stringify(jsonObj)).x)
</script>
```

---
#### 模块化

* 封装到模块里 

```html
<script src="xxx.js" type="module"/>
```

* 这里需要从js文件导出


```js
/*export*/let a = 'xxx;
/*export*/function myFun(){
    return a+'ce';
}
//可以一起导出，也可以单个导出 导出就可以起别名
export {a /*as usea*/,b,myFun}
//缺省 不指定任何名字 但是只可以一个
exprot defalut funciton(){
    return "";
}
```

:::danger 注意:
缺省 不指定任何名字 但是每个文件、模块只可以一个
:::

* 导入

```js
import {myFun} from './xxx.js'
//可以别名处理
import {myFun as myfun} from './xxxx.js'
//缺省导入
import print from './xxxx.js'
//全部导入
import * as one from './one.js'
//use 可以用任何一个导出的
one.add() 
```

---
[_箭头函数_]:.././webpack/01-Core.md
[_回调函数_]:.././webpack/01-Core.md