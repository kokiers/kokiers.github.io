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


 shape-outside 设置文字环绕

```bash
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