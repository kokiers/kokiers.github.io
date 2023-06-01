---
title: canvas Api
categories:
  - doc
tags:
  - canvas
abbrlink: 6f7abb59
date: 2019-08-04 09:48:43
---

canvas 常用api整理
<!-- more -->

### 文字
设置样式 `fillStyle`, `strokeStyle`
`fillText` 实心
`strokeText` 空心
```javaScript
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas)
ctx.fillStyle = 'blue'
ctx.font = "30px serif";
ctx.fillText("Hello world",0, 100);
ctx.strokeStyle = 'red'
ctx.strokeText("Hello world",0, 20);
```
### 绘制矩形

+ 清除矩形
  `ctx.clearRect(x, y, width, height)`;
+ 实心矩形
  `ctx.fillRect(x, y, width, height)`;
+ 空心矩形
  `ctx.strokeRect(x, y, width, height)`;

### 绘制路径节
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
```javaScript
beginPath()
closePath()
stroke()
fill()
```

`moveTo(x, y)`将笔触移动到指定的坐标x以及y上。
`lineTo(x, y)`绘制一条从当前位置到指定x以及y位置的直线。
`arc(x, y, radius, startAngle, endAngle, anticlockwise)`:x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向。
注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
`弧度=(Math.PI/180)*角度。`

```javaScript
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas)
ctx.fillStyle = 'blue'
ctx.beginPath();
ctx.arc(70, 70, 20, 0, Math.PI / 2, false);
ctx.fill(); //fill 画实心， stroke 是画空心
```

`arcTo(x1, y1, x2, y2, radius)`:创建介于两个切线之间的弧：

+ lineWidth 线宽
  `ctx.lineWidth = value`;
+ lineCap 线段末端的属性
  `ctx.lineCap = "butt"`; 方形
  `ctx.lineCap = "round"`; 圆形
  `ctx.lineCap = "square"`; 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域
+ lineJoin 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。
  `ctx.lineJoin = "bevel"`;
  `ctx.lineJoin = "round"`;
  `ctx.lineJoin = "miter"`;//默认
+ setLineDash 填充线时使用虚线模式
  `ctx.setLineDash(segments)`;//segments 为空数组为实线
+ lineDashOffset 设置虚线偏移量的属性
  `ctx.lineDashOffset = value`;

### 贝塞尔曲线

`quadraticCurveTo(cp1x, cp1y, x, y)`:绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`:绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
### 渐变和图案
+ `ctx.createLinearGradient(x0, y0, x1, y1)`;


### 绘制透明度
`globalAlpha` 设置图形和图片透明度的属性。数值的范围从 0.0（完全透明）到 1.0（完全不透明）。
### 绘制混合
`globalCompositeOperation`
 this.ctx.globalCompositeOperation = 'source-over';



