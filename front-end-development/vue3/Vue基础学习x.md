# [VUEX基础](https://next.vuex.vuejs.org/zh/) 

![GitHub repo file count](https://img.shields.io/github/directory-file-count/zbsilent/GitBook?color=brightgreen&logoColor=brightgreen)
![node-current](https://img.shields.io/node/v/webpack)

_组件通信、组件状态管理_


:::danger 注意

getters 里是属性的派生属性，比如灯亮了 ，导致其他开关打开 这种可以通过灯亮就获取到  

Vuex 的 store 中的状态的唯一方法是提交 mutation 只可以同步

Action 提交的是 mutation，而不是直接变更状态。可以异步操作

模块化后处理的方式 可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块

```js
const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
const products = computed(() => store.getters['cart/cartProducts'])
const total = computed(() => store.getters['cart/cartTotalPrice'])
const checkout = (products) => store.dispatch('cart/checkout', products)
```

:::