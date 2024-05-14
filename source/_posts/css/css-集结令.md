---
title: css 集结令
lang: css
abbrlink: 737fe060
date: 2021-07-20 10:56:07
categories:
  - css
tags:
 - css
 - css 技巧
---

不间断记录css小技巧
 #### shape-outside 设置文字环绕
 <!-- more -->

```css
   /* 关键字值 */
  shape-outside: none;
  shape-outside: margin-box;
  shape-outside: content-box;
  shape-outside: border-box;
  shape-outside: padding-box;

  /* 函数值 */
  shape-outside: circle();
  shape-outside: ellipse();
  shape-outside: inset(10px 10px 10px 10px);
  shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);

  /* <url> 值 */
  shape-outside: url(image.png);

  /* 渐变值 */
  shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);

  /* 全局值 */
  shape-outside: initial;
  shape-outside: inherit;
  shape-outside: unset;
```

层叠感
```html
<div class="wrap wrap-0">
  <div class="wrap wrap-1">
    <div class="content">哈哈哈哈</div>
  </div>
</div>
```
```css
.wrap{
  background: transparent;
  position: relative;
  top: -10px;
  border-radius: 10px;

  &.wrap-0::before{
   content: '';
   display: inline-block;
   position: absolute;
   background: #fff;
   bottom: -10px;
   left:30px;
   right: 30px;
   height: 30px;
   border-radius: inherit;
   box-shadow: 0px 2px 24px 0px rgba(200,201,204,0.5);
 }
  &.wrap-1::before{
    content: '';
    display: inline-block;
    position: absolute;
    background: #fff;
    bottom: -12px;
    left:20px;
    right: 20px;
    height: 30px;
    border-radius: inherit;
    box-shadow: 0px 2px 24px 0px rgba(200,201,204,0.5);
  }
  .content{
    padding: 10px;
    background: #fff;
    border-radius: inherit;
    box-shadow: 0px 2px 24px 0px rgba(200,201,204,0.5);
    width: 200px;
    height: 200px;
  }
}
```