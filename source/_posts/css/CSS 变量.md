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


CSS 扩展语言主要有`stylus` `less` `sass`
<!-- more -->
#### 1、stylus
+ 变量用$
+ scoped 局部css 要穿透 使用 `>>> `
```vue
<!-- 隐入外部的css文件 -->
<style lang="stylus" scoped>
@import "./style.stylus";
$text-color = #2D3040
 .clip
    background-color:$text-color
    >>> em
     color: #333
</style>
```

#### 2、less

##### 使用方式
1.在 Node.js 环境中使用 Less ：
```bash
npm install -g less
lessc styles.less styles.css
```
2.在浏览器环境中使用 Less ：
```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
```

##### 变量
+ 变量用@
+ scoped 局部css 要穿透 使用 `::v-deep`
```less
@backgroundColor: #FAF4FA; 
 .clip
    background-color:$backgroundColor
```

##### 混合（Mixins）
```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  .bordered();
}
```

##### 运算（Operations）
算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。
```Less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
@base: 2cm * 3mm; // 结果是 6cm
@color: (#224488 / 2); // 结果是 #112244
background-color: #112244 + #111; // 结果是 #223355

// each range for loop
each(range(4), {
  .col-@{value} {
    height: (@value * 50px);
  }
});

// output
.col-1 {
  height: 50px;
}
.col-2 {
  height: 100px;
}
.col-3 {
  height: 150px;
}
.col-4 {
  height: 200px;
}
```