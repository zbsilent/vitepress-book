# VUE基础

## 安装脚手架

npm i -g @vue/cli

## 创建项目

vue create projectName

## 扩展配置

### [vue.config.js]()

* webpack方法
```js
const path = require('path')

moudle.export{
    output:{
        path:path.resolve(__dirname,'build')
    }
}
```
* [Vue使用单独语法 封装了一层](https://cli.vuejs.org/zh/config/)
  
```js
const MyAwesomeWebpackPlugin = require("MyAwesomeWebpackPlugin")
moudle.export{
   outputDir:'build'
//    configureWebpack: {
//     plugins: [
//       new MyAwesomeWebpackPlugin()
//     ]
//   }
 
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
        plugins:[
                new webpack.BannerPlugin({
                    banner:'MIT Licensed | Copyright © 2021-present zbsilent'
                })
            ]
        }
  }
}
```

:::danger 注意
public 目录下的文件是静态的，原封不动的打包
```ts
//这样肯定不可以 静态页面不是响应式的
createApp({
    data() {
        return {
            mes:'hell word'
        }
    },
}).mount("#app")
```
:::
## 基础语法

### 插值语法

* 可以写简单运算 逻辑不可可以写入
  
```js{2}
<templete>
{{params+''+ str}}
<h2>{{num+num*2}}
</template>
<script>
    export default({
        name:'App',
        data(){
            return {
                params:'我',
                str:'爱你',
                num:3,
                url:`<a href="https://www.baidu.com"/>`
            }
        }
    })
</script>
```

#### 指令 v-

* v-pre
* v-once 只取初值
* v-text 会覆盖标签值 如果是变量 `<h2 v-text="num"/>` 来源于组件data
* v-html `<h2 v-html="url">` 会解析为连接  类似 innerHTML

#### 数据绑定

* v-bind 
```js
//动态属性绑定 比如style
<a v-bind:title=""/>
//语法糖方式
<a :title=""/>
<img :src='imgsrc' :width='size' :hight='size' alt=''/> 直接从data里获取
<style>
.basic {
    font-size: 100px;
}
.happy {
    background-color: aqua;
}
.unHappy {
    background-color: greenyellow;
}
.normal{
    background-color: brown;
}
.sad{
    background-color:black;
}
</style>        
//样式绑定  
<div class="basic" :style="styleObj">{{name}}</div>
//数组写法
<div class="basic" :class="classObj" :style='[fontSize,backgroundColor]'>{{name}}</div>
data(){
    return {
        classObj:{
            sad:false,
            happy:false
        },
        styleObj:{
            fontSize: "100px",
            backgroundColor:"greenyellow"
        }
    }
}

```

* v-model
  *  v-model.layz 懒加载
  *  v-model.number 直接转换
  *  v-model.trim 去除空格

```js
//实现了双向绑定 读写
<input type="text" v-model.trim="msg"/>
{{msg}}
```

* v-model 双向绑定 测试

互斥radio
```html
<label for='one'>
    <input id ='one' type='radio' value='female' v-model='sex'/>female
</label>
<label for='one'>
    <input id ='one' type='radio' value='male' v-model='sex'/>male
</label>
<hr/>
{{sex}}
```
多选
```html
<select v-model='lang' multiple>
    <option value='java'>java</option>
    <option value='php'>php</option>
</select>
<hr/>
{{lang}} //多选这里就是数组
```


#### 计算属性 

* 业务逻辑不要在模版里写 

```js
<template>
  <div>{{ lastName }}-{{ firstName }}</div>
  <hr/>
  <div>{{ fullName }}</div>
  <button @click="update">alt</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      firstName: "zbsilent",
      lastName: ".Mr",
    };
  },
  computed: {
    //有人读取被监听属性时候，就会调用get方法，返回一个值 操作这个的时候set就会写人
    fullName: {
      get(): any {
        console.log("数据读取");
        return this.lastName + this.firstName;
      },
      //这里如果有人去处理这个值就得写set
      set(val: string): any {
        console.log("数据被操作，写入：" + val, this);
        //this.fullName = this.lastName + this.firstName;
        this.firstName = val;
      },
    },
  },
  methods: {
    update() {
      //this.fullName = "Reno"; //这里不改变fullName的属性，则不计算属性的set方法 
      this.lastName ="..."
    },
  },
});
</script>

<style></style>

```

## 组件化开发

### Vue组件

* 组件的分类
  * 页面
  * 业务逻辑可复用
  * 独立功能
* 三要素
  * prop用一定义组件属性
  * 事件触发
  * slot用于组件的功能扩展
* 设计需要
  * 可扩展性
  * 组件方法函数抽离
  * 文档详细
  * 颗粒度合适
  * 功能单一，代码行数适中

#### 组件通信

:::warning 注意

1. 父子组件通信 props
   1. 父组件直接通过属性传 `<Parent params='user'/>`
   2. 子组件通过 props接收 `props:{params:string...}`
   3. JS写法 `porps:{params:{type:String,default:'default',required:true}}`
   4. 也可以用数组形式 `props:['params'...]`


:::danger required必须传

```js
props:{
    params:{
        type:Function,
        required:true
    }
}
```
:::
::: tip 子传父
1. 子组件传递个父亲组件
   1. 通过事件触发方式传递给父组件 在`setup(props,context)` 利用<font color='red'>context.emit('父组件自定义事件',参数)</font> 传统方式使用 <font color='red'>this.$emit</font>
   2. 父亲组件 `<button @childaction='action'>`定义自定义事件,然后 `acont ction=()=>{/.../}`
   3. 这里注意属性的响应状态 <font color='red'>ref的值需要value获取</font>
   4. 还可以将父亲组件方法直接传递给子组件  `<Child :updateCount="updateCount">`,然后子组件通过`props:{updateCount:{type:Function,required:true}}`接受这个方法，然后用子组件方法调用
   5. 还可以通过this.$parent.`function | props`方法属性
   6. <font color='red'>注意:新特性  expose 暴露公共 property (函数) </font> setup(context)里包含expose属性，可以将子方法丢给父亲用，`expose({updateCount})`,父亲组件 则在 标签`<Child ref='upCount'>`响应式的获取 `const upCount = ref()`,然后通过 `upCount.vaule.updateCount()`方法来调用 

:::

#### 插槽slot

_Refenece:_ Vue 实现了一套内容分发的 API,将 `<slot> `元素作为承载分发内容的出口。可以对模版的功能进行扩展

```html
<template>
    <h6>测试插槽</h6>
    <slot :user='user'><h2/><slot> //可以设置缺省值
    <slot name='one'>xxx<slot> //可以设置多个插槽
    <slot name='two'>{{user.name}}<slot> //可以设置多个插槽
</template>
<script>
    data(){
        return {
            user:{
                name:'reno',
                age:16
            }
        }
    }
</script>
//name: my-item

//Parent包含4个Child组件
<my-tiem>
    <input/>
    <template v-solt:one>
        <my-children /> //只替换one的区域
    </template>
    <template v-solt:default="subdate">
       <a>{{subdate.user.name}}</a> //只替换one的区域  
    </template>
    <template #two>
        <my-children /> //具名插槽传地简写
    </template>
</my-item>
<my-tiem>
    <img/>
</my-item>
```
* 插槽是通过父组件渲染过去的 
* 父组件想使用子组件数据<font color='red'> `<slot :user='user'>`必须子组件绑定</font>，父亲组件 就可以通过`v-solt:default="subdate"`直接用插槽里子组件数据 `subdata.user.name`就可以使用



### 路由

```html
<!--标签高亮-->
<router-link class="bg" active-class="active" to="/">Home</router-link>  //路由连接
<router-link to="/about">About</router-link>

 <!-- 具名插槽方式把链接修改掉 其他属性不变-->
<router-link to="/about" custom v-slot="{navigate}">
  <button @click="navigate" @keypress.enter="navigate" role="link">测试</button>
</router-link>
<!-- 全局变量操作 -->
<button @click="$router.go(-1)">返回</button>
<button @click="$router.push('/')">主页</button>

<!-- 获取路由地址 -->
{{$route.path}}
<!-- 站位符 -->
<router-view/> 
<!--对位使用-->
<router-view class='one' name='User'><router-view> 
<router-view class='two'><router-view> 
<router-view class='three' name='About'></router-view>

```

#### 路由配置文件

> mkdir router

```js
//路由工作模式
import { createRouter, createWebHistory,/*createWebHashHistory */} from 'vue-router'
import Home from '../views/Home.vue'

const routers = [
    {path:'/', name:'Home', component:Home},
    {path:'/about', name:'About', component:About /*,component: () => import('../views/About.vue')*/},
    {path:'/',name:'Home',components:{
        default:Home,
        About,
        User
    }}
]

const router = createRouter({
    history:createWebHashHistory,/*createWebHistory(process.env.BASE_URL),*/
    //如果是 createWebHistory ，直接用上面的 routers 
    routers:[
        {path: '/' , redirect:'/Home'},//重定向
        {path: '/Home' , component:Home},
        {path: '/About' , component:About}
    ]
})
export default router;

```

#### min.js配置

```js
import router from './router'
createApp(App).use(router).mount('#app')
```

#### 模式切换和懒加载

::: danger 注意
代码分离级别路由，如果不是用箭头函数导入，都将一次封装都js里 ，所以使用 `component: () => import('../views/About.vue')`导入

Hash模式带# 指导浏览器动作的  
历史模式 HTML HistoryAPI和服务器配置
:::

#### 子路由模式 

* 修改路由配置文件


:::details 详细配置 
```js{5}
 {
    path: "/about",
    name: "About",
    component: () =>  import(/* webpackChunkName: "about" */ "../views/About.vue"),
    children: [
      {
        path: "/detial",
        name: "Detial",
        component: () => import("../views/Detial.vue"),
      },
    ],
  }
```
:::

#### 动态路由参数传递方式

* 传递参数主要有两种方式 : `params`和`query`
* params的类型:
  * 配置路由格式 :`/user/:id` (动态路由)
  * 传递方式: 在path后面的对应的值 :`to ="'/user/'+uid"`
  * 传递后形成的路径 : `/user/9,/user/zbs`
  * 接收参数 :`$route.params.id` setup里 可以用  `const route = useRoute()` 然后 `rotue.params.id`
* query类型
  * 配置路由格式 `/user`，正常配置
  * 传递方式 对象中使用query的key作为传递方式 `to={path:'/',query:{id:1,name:'abc'}}`
  * 接收参数 $route.query.name `rotue.query`

:::details 参数传递配置

:::
#### [路由守卫](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

#### [keep-alive](https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive)
:::danger 注意
```html
<!-- 插槽形式保持不被销毁 -->
    <router-view v-slot="{ Component }" }>
      <!-- 组件过度效果 -->
      <transition> 
        <keep-alive>
          <component :is="view"></component>
        </keep-alive>
      </transition>
    </router-view>
```
:::