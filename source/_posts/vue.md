---
title: vue 
categories:
  - js
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

```bash
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
[响应式](https://cn.vuejs.org/v2/guide/reactivity.html) Object.defineProperty
 
+ vue data中定义
```
var vm = new Vue({
  data:{
    a:1
  }
})
```
+ vue set 方法向嵌套对象添加响应式
```
Vue.set(vm.someObject, 'b', 2)
```
+ 已有对象赋值多个新属性
```
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```
#### Vue 路由
[vue-router](https://router.vuejs.org/)

+ 全局前置守卫 确保调用next 否则钩子就不会被 resolved。
```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
+ 全局后置钩子
```
router.afterEach((to, from) => {
  // ...
})
```
+ 路由独享的守卫
```
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
```
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
