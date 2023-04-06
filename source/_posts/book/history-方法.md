---
title: history 方法
lang: book
abbrlink: 64ae500f
date: 2022-08-14 16:03:02
tags:
categories:
  - doc
---

 摘抄自MDN 文档，详见 [history Api 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)
 ```javaScript
history.back()
history.forward()
history.go() 
history.pushState()
history.replaceState()
```
 <!--more-->

```javaScript
let stateObj = {
    foo: "bar",
};
history.pushState(stateObj, "page 2", "bar.html");
history.replaceState(stateObj, "page 3", "bat.html");
```
