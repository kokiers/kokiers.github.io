---
title: canvas 使用手册
lang: js
abbrlink: 3b2d7402
date: 2021-09-06 14:55:08
tags:
 - 手册
---


#### arc 
  ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise); //anticlockwise 可选的Boolean值 ，如果为 true，逆时针绘制圆弧，反之，顺时针绘制。 

```javaScript
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas)
ctx.fillStyle = 'blue'
ctx.beginPath();
ctx.arc(70, 70, 20, 0, Math.PI / 2, false);
ctx.fill(); //fill 画实心， stroke 是画空心
```
<!--more-->

#### 文字
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

#### 矩形
+ 清除矩形
  `ctx.clearRect(x, y, width, height)`;
+ 实心矩形
  `ctx.fillRect(x, y, width, height)`;
+ 空心矩形
  `ctx.strokeRect(x, y, width, height)`;

#### 线
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

#### 渐变和图案
+ `ctx.createLinearGradient(x0, y0, x1, y1)`;