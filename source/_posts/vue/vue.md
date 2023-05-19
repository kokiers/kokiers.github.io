---
lang: js
title: vue2 的知识
categories:
  - vue
tags:
  - vue
abbrlink: c0add594
date: 2019-07-13 22:42:29
---
#### vue 生命周期
[生命周期](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
+ beforeCreate
+ created
+ beforeMount
<!--more-->
+ mounted
+ beforeUpdate
+ updated
+ activated
+ deactivated
+ beforeDestroy
+ destroyed

#### Vue 组件开发
[组件开发](https://cn.vuejs.org/v2/guide/components-registration.html)

```javaScript
import child from './child'
export default mychild{
  install: function (Vue) {
    Vue.component('child', child),
  }
}

// 
vue.use(mychild)
```
#### Vue 响应式 
[响应式](https://cn.vuejs.org/v2/guide/reactivity.html) `Object.defineProperty`
 
+ vue data中定义
```javaScript
var vm = new Vue({
  data:{
    a:1
  }
})
```
+ vue set 方法向嵌套对象添加响应式
```javaScript
Vue.set(vm.someObject, 'b', 2)
```
+ 已有对象赋值多个新属性
```javaScript
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```
#### Vue 路由
[vue-router](https://router.vuejs.org/)

+ 全局前置守卫 确保调用next 否则钩子就不会被 resolved。
```javaScript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
+ 全局后置钩子
```javaScript
router.afterEach((to, from) => {
  // ...
})
```
+ 路由独享的守卫
```javaScript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
+ 组件内的守卫
```javaScript
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```


vue 原理
vue2 vue3 区别
vue 组件生命周期，组件通信

uniapp 与flutter 优缺点，取舍？
uniapp 是vue写的，更容易上手。 需要转译成原生的，不够流畅。 插件少，很多需要付费。
flutter 是谷歌公司发布的，更原生，更流畅。插件更多，更方便。就是国内资料较少。



```javascript
async function sleep(millis) {
      new Promise(()=>{
   setTimeout(()=>{
    resolve()
    },millis)
      })
}
```

v-on 常用修饰符
.stop 该修饰符将阻止事件向上冒泡。同理于调用 event.stopPropagation() 方法
.prevent 该修饰符会阻止当前事件的默认行为。同理于调用 event.preventDefault() 方法
.self 该指令只当事件是从事件绑定的元素本身触发时才触发回调
.once 该修饰符表示绑定的事件只会被触发一次


$route和$router的区别？
$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
$router是’路由实例’对象包括了路由的跳转方法，钩子函数等。


#### vuex
有五种,分别是State , Getter , Mutation , Action , Module (就是mapAction)

1. state：vuex的基本数据，用来存储变量

2. geeter：从基本数据(state)派生的数据，相当于state的计算属性

3. mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action)。每个mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。

4. 
action：和mutation的功能大致相同，不同之处在于 ==》
1. Action 提交的是 mutation，而不是直接变更状态。 
2. Action 可以包含任意异步操作。

5. modules：模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

