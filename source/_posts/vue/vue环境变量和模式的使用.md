---
lang: js
title: vue环境变量和模式的使用
abbrlink: f1c0636f
date: 2019-11-27 09:12:30
categories:
  - vue
tags:
 - vue
---

#### 前言

vue中使用vue create app创建项目后，需要转发请求到后端的接口。在测试的时候，需要和多个后端ip联调。
这个时候需要有个配置文件，当需要对接某一个的时候启动一下专属服务就比较方便。

所幸，vue 给我们提供了这一个便利的可能性。环境变量和模式。

官方文档[vue 环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)
<!--more-->
```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

##### 新建一个配置文件
项目根目录下 新建一个 .env.test.local。这样 git忽略这个文件。

```javaScript
NODE_ENV = 'development'
VUE_APP_HOST = 'http://127.0.0.1:8090'
```

##### 配置代理转发
vue.config.js 拿到配置的数据

```javaScript
let key  = ['/login','/api/']
let host = process.env.VUE_APP_HOST || 'http://localhost:8080' 
let obj  = {}

key.forEach((v)=>{
  obj[v] = {
    target:host
  }
})

module.exports = {
  devServer:{
    proxy:obj
  },
  chainWebpack:config => {
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
  }
}

```

##### 如何使用

```bash
npx vue-cli-service serve --mode test 
```

这样启动服务就会把api,login的接口请求转发到 http://127.0.0.1:8090。

指定 启动的服务端口 8083
```bash
npx vue-cli-service serve --mode test --port 8083
```










