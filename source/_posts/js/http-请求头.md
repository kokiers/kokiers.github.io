---
title: http 请求头
lang: js
abbrlink: 96b40927
date: 2022-08-04 23:12:57
tags:
categories:
  - doc
---

http 请求知识点汇总整理，详见[MDN HTTP文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
常用的请求头 Request Headers
常用的响应头 Response Headers
<!--more-->

#### 常用的请求头 Request Headers
Accept：定义客户端可接受的响应内容类型；
Accept-charset：定义客户端可接受的字符集；
Accept-Encoding：定义客户端可接受的编码方式，比如打包方式--gzip 等；
cookie：由服务器通过 set-cookie 设置的 cookie；
Content-Length：请求体的长度；
Content-Type：请求体的数据类型：Content-Type: application/x-www-form-urlencoded；
Date：发送该请求的日期和时间；
Host：所请求的服务器地址；
Referrer：表示页面是从哪个地链接过来的，可以用来统计网页上的链接访问量；
User-Agent：显示客户端的身份标识；
If-Modified-Since：用于协商缓存，取自 Response haders 中的 Last-Modified 字段。服务器通过对比这两个字段判断缓存是否有效；
If-None-Match：用于协商缓存，取自 Response Headers 中的 E-tag 字段。服务器通过对比这两个字段判断缓存是否有效；


#### 常用的响应头 Response Headers
Access-Control-Allow-Origin：指定哪些网站以跨域资源共享（CORS）；
Content-Encoding：响应资源的编码方式；
Content-Language：响应资源所使用的语言；
Content-Length：响应资源的长度；
Content-type：响应内容的数据类型；
Date：消息被发送时的日期和时间；
Location：用于重定向；
Set-Cookie：用于设置客户端的 cookie ；
Status：用来说明当前 Http 连接的状态；
Last-Modified：服务器返回给客户端，下次请求通过在 Resquest Headers 中的 If-Modified-Since 字段携带过来。
E-tag：服务器返回给客户端，下次请求通过在 Resquest Headers 中的 If-None-Matched 字段携带过来。
Cache-Control：
    max-age：缓存有效期，浏览器自己通过计时判断缓存是否过期。如果未过期则命中强制缓存。
    no-cache：不使用强制缓存，直接进入协商缓存。
    no-store：不使用缓存，每次请求都会进行 http 请求。
