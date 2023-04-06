---
title: dns 整理
lang: book
abbrlink: d099dabd
date: 2022-10-14 12:09:35
categories:
  - doc
tags:
---


www.google.com.cn 
三级域名.二级域名.顶级域(通用顶级域，国家地区顶级域)

<!-- more -->

前端之优化 DNS预解析
DNS Prefetch，即DNS预获取，是前端优化的一部分。一般来说，在前端优化中与 DNS 有关的有两点：
 + 减少DNS的请求次数
 + DNS预获取 

 目前大多数浏览器已经支持此属性，支持版本如下：

– Safari: 5+
– Chrome: All
– Firefox: 3.5+
– Opera: Unknown
– IE: 9+ (called “Pre-resolution” on blogs.msdn.com)

```html
<meta http-equiv="x-dns-prefetch-control" content="on">// 如需关闭  改成off
<link rel="dns-prefetch" href="//www.img.com">
<link rel="dns-prefetch" href="//www.api.com">
```