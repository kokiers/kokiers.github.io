---
lang: css
title: css 变量
categories:
  - css
tags:
  - css
abbrlink: 5f2b98d1
date: 2020-08-20 15:56:07
---


##### 1、stylus

```bash
$text-color = #2D3040
 .clip
    background-color:$text-color
```

 scoped 局部css 要穿透 使用 >>> 

##### 2、less

```bash
@backgroundColor: #FAF4FA; 
 .clip
    background-color:$backgroundColor
```

scoped 局部css 要穿透 使用  ::v-deep