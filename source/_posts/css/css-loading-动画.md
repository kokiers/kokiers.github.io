---
lang: css
title: css loading 动画
categories:
  - css
tags:
  - css 动画
abbrlink: 83b1b72a
date: 2019-11-21 09:26:12
---
css 实现加载中点点点动画。
<!--more-->
用stylus写的。

```stylus
$text-color = #2D3040
 .clip
    background-color:$text-color
    display: inline-block; 
    width:4px;
    height:4px;
    border-radius:4px;
    vertical-align:middle;
    position:relative;
    margin-left:2px;
    animation: dot1 2s infinite step-start both;
    &:before
      content:''
      background-color:$text-color
      display: inline-block; 
      width:4px;
      height:4px;
      border-radius:4px;
      position:absolute;
      left: 8px;
      visibility:hidden
      animation: dot2 2s infinite step-start both;
    &:after
      content:''
      background-color:$text-color
      display: inline-block; 
      width:4px;
      height:4px;
      border-radius:4px;
      position:absolute;
      left: 16px;
      visibility:hidden
      animation: dot3 2s infinite step-start both;
@keyframes dot1
  0%,100%
    visibility:hidden; 
  50%
    visibility:visible;
  80%
    visibility:visible;
@keyframes dot2
  0%,25% 
    visibility:hidden; 
  75% 
    visibility:visible; 
  90%
    visibility:hidden;
@keyframes dot3
  0%,50% 
    visibility:hidden; 
  75% 
    visibility:visible; 
  90%
    visibility:hidden;
```