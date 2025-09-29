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
```
<template>
  <button class="gradient-button">
    渐变边框按钮
  </button>
</template>

<style lang="scss" scoped>
.gradient-button {
  position: relative;
  padding: 12px 24px;
  background: white;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(
      45deg,
      #12c2e9,
      #c471ed,
      #f64f59
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: opacity 0.3s;
  }
  
  &:hover::before {
    opacity: 0.8;
  }
  
  &:active::before {
    opacity: 1;
  }
}
</style>
```

```
<template>
  <div class="gradient-borders-demo">
    <!-- 基础渐变边框 -->
    <div class="box border-basic">
      基础渐变边框
    </div>

    <!-- 动画渐变边框 -->
    <div class="box border-animated">
      动画渐变边框
    </div>

    <!-- 悬停效果边框 -->
    <div class="box border-hover">
      悬停渐变边框
    </div>

    <!-- 圆角渐变边框 -->
    <div class="box border-rounded">
      圆角渐变边框
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gradient-borders-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  .box {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #333;
  }

  // 基础渐变边框
  .border-basic {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }

  // 动画渐变边框
  .border-animated {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      background: linear-gradient(
        90deg,
        #12c2e9 0%,
        #c471ed 50%,
        #f64f59 100%
      );
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: rotate 3s linear infinite;
    }
  }

  // 悬停效果边框
  .border-hover {
    position: relative;
    transition: all 0.3s;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  // 圆角渐变边框
  .border-rounded {
    position: relative;
    border-radius: 10px;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
      border-radius: inherit;
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
```