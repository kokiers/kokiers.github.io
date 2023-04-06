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
##### 绘制矩形

绘制一个填充的矩形
```
fillRect(x, y, width, height)
```
绘制一个矩形的边框
```
strokeRect(x, y, width, height)
```
清除指定矩形区域，让清除部分完全透明。
```
clearRect(x, y, width, height)
```

##### 绘制路径节
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
```javaScript
beginPath()
closePath()
stroke()
fill()
```

将笔触移动到指定的坐标x以及y上。
```javaScript
moveTo(x, y)
```

绘制一条从当前位置到指定x以及y位置的直线。
```javaScript
lineTo(x, y)
```

圆弧
```javaScript
arc(x, y, radius, startAngle, endAngle, anticlockwise)
```
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。

```javaScript
arcTo(x1, y1, x2, y2, radius)
```

这里详细介绍一下arc方法，该方法有六个参数：x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向。

注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
`弧度=(Math.PI/180)*角度。`

##### 贝塞尔曲线
```javaScript
quadraticCurveTo(cp1x, cp1y, x, y)
```
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
```javaScript
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。