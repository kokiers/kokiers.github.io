---
title: web-paint
lang: tool
abbrlink: dc832c43
date: 2025-06-26 09:55:23
tags:
---

### TTFB
TTFB即首个字节返回时间（Time To First Byte），时间越短意味着请求响应越快。
以下是优化该性能指标的常见方法:

CDN
压缩算法
HTTP/2或HTTP/3
HTTP缓存策略
减少重定向

### LCP
即首次绘制内容时间（First Contentful Paint），时间越短意味着页面白屏时间越短。低于1.8s代表良好，1.8s到3s之间代表待改善，3s以上代表差。

服务端流式渲染
内联关键CSS
减少使用CSS @import
Javascript脚本添加async或defer属性