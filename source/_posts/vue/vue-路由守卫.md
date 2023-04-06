---
title: vue 路由守卫
lang: vue
abbrlink: 3c01b976
date: 2022-08-03 20:35:16
tags:
categories:
  - vue
---

### 路由模式
hash 模式 用 createWebHashHistory() 创建的：
HTML5 模式 用 createWebHistory() 创建 HTML5 模式. 需要服务端配置

```javaScript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),// createWebHistory()
  routes: [
    //...
  ],
})
```
*** 
<!--more-->
### 全局守卫 
#### 全局路由守卫 beforeEach

```javaScript
const router = createRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
  // 返回 false 以取消导航
  return false
  // 如果什么都没有，undefined 或返回 true，则导航是有效的
})
```

#### 全局解析守卫 beforeResolve
这和 `router.beforeEach` 类似，因为它在 **每次导航时都会触发**，但是确保在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用。
```javaScript
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```
`router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

#### 全局后置钩子 afterEach
没有next 入参，不会改变路由。可以用在路由完成后，修改页面标题等
```javaScript
router.afterEach((to, from,failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

### 单个路由守卫
#### 路由独享的守卫 beforeEnter
路由配置上定义 beforeEnter 守卫：
```javaScript
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```
```javaScript
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]

```

### 组件内守卫
你可以为路由组件添加以下配置：

+ `beforeRouteEnter` //此时不能用this 还未创建组件实例
+ `beforeRouteUpdate`
+ `beforeRouteLeave` // 离开守卫 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消。

```javaScript
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```


