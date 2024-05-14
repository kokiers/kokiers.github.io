---
title: http 强缓存 协商缓存
lang: js
abbrlink: 21e89f78
date: 2022-08-04 23:23:49
tags:
  - http
categories:
  - doc
---


缓存分成两种 **强缓存**  **协商缓存**
强缓存优先级高于协商缓存
<!--more-->

#### 强制缓存:
服务器端认为请求资源应该被缓存，则在响应头部设置cache-control:max-age=（一年时间），如果max-age没有过期，则下次请求直接在缓存中获取资源

Expires
`cache-control:no-store` 表示不使用强制缓存
`cache-control:no-cache` 表示缓存需要重新验证是否过期


#### 协商缓存（对比缓存）:

一种服务端的缓存策略。
+ 第一次请求，服务器端认为请求资源可以被缓存，则返回**资源和资源的标识**，浏览器将其存储在本地缓存，
+ 下一次访问时 **发送请求以及资源标识**，服务器对比资源标识对应资源是否为对应服务器资源最新版本，
  -- 如果是服务器返回304状态码，直接从缓存中获取资源，
  -- 如果不是最新资源，服务器返回200状态码，最新资源以及最新资源的标识

##### 资源标识：
last-modified
etag

优先使用etag,原因：
+ 1.last-modified只精确到秒，可能会造成误差
+ 2.对于不同时间重复生成的相同文件，last-modified无法较好的识别，etag可以


一般只有get 请求进行缓存

### 缓存控制
 Cache-control 头

  + `Cache-Control: no-store` // 不缓存
  + `Cache-Control: no-cache` // 每次有请求发出时，缓存会将此请求发到服务器 由服务器返回是否缓存过期，返回200 或者304
  + `Cache-Control: private` // 私有缓存
  + `Cache-Control: public`  // 公共缓存 可被中间的代理，cdn等缓存
  + `Cache-Control: max-age=31536000` //设置缓存过期时间 单位一般是秒   

  更多详细介绍 [MDN HTTP cache ](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)