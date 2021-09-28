---
title: svg 使用手册
lang: js
abbrlink: 2538c5b0
date: 2021-09-28 10:05:12
tags:
---


#### viewBox 
viewBox属性的值是一个包含4个参数的列表 min-x, min-y, width and height，

#### defs
  defs 定义好形状，或者颜色变化的。最后use调用
```bash
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Some graphical objects to use -->
  <defs>
    <circle id="myCircle" cx="0" cy="0" r="5" />

    <linearGradient id="myGradient" gradientTransform="rotate(90)">
      <stop offset="20%" stop-color="gold" />
      <stop offset="90%" stop-color="red" />
    </linearGradient>
  </defs>

  <!-- using my graphical objects -->
  <use x="5" y="5" xlink:href="#myCircle" fill="url('#myGradient')" />
  <use x="15" y="5" xlink:href="#myCircle" fill="url('#myGradient')" />
</svg>
```

#### 基本形状元素
+ circle: cx cy r
```
  <circle cx="60" cy="60" r="50"/>
```
+ ellipse: cx cy rx ry
```bash
<svg viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Some graphical objects to use -->
  <defs>
    <ellipse id="myCircle" cx="0" cy="0" rx="6" ry="10"/>

    <linearGradient id="myGradient" gradientTransform="rotate(90)">
      <stop offset="20%" stop-color="gold" />
      <stop offset="90%" stop-color="red" />
    </linearGradient>
  </defs>
  <!-- using my graphical objects -->
  <use x="8" y="15" xlink:href="#myCircle" fill="url('#myGradient')" />
</svg>
```
+ line x1 y1 x2 y2 
```
<line x1="0" y1="80" x2="100" y2="20" stroke="black" />
```
+ polygon: 多边形 收尾连接
```bash
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Example of a polygon with the default fill -->
  <polygon points="0,100 50,25 50,75 100,0" />

  <!-- Example of the same polygon shape with stroke and no fill -->
  <polygon points="100,100 150,25 150,75 200,0"
            fill="none" stroke="black" />
</svg>
```
+ polyline: 收尾不连接。当 no fill 是就是各点连成线
```bash
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Example of a polyline with the default fill -->
  <polyline points="0,100 50,25 50,75 100,0" />

  <!-- Example of the same polyline shape with stroke and no fill -->
  <polyline points="100,100 150,25 150,75 200,0"
            fill="none" stroke="black" />
</svg>

```
+ rect: 矩形 x width height rx(圆角半径) ry
  ```bash
  <rect width="100" height="100" />

  <!-- Rounded corner rectangle -->
  <rect x="120" width="100" height="100" rx="15" />
  ```

#### 容器元素
```
<a>, <defs>, <g>, <marker>, <mask>, <missing-glyph>, <pattern>, <svg>, <switch>, <symbol>, <unknown>

```
#### 渐变元素
```
<linearGradient>, <radialGradient>, <stop>


<defs>
    <linearGradient id="MyGradient">
        <stop offset="5%"  stop-color="green"/>
        <stop offset="95%" stop-color="gold"/>
    </linearGradient>
</defs>

<rect fill="url(#MyGradient)"
      x="10" y="10" width="100" height="100"/>
```
```
<radialGradient>
<defs>
    <radialGradient id="myGradient">
      <stop offset="10%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </radialGradient>
  </defs>

  <!-- using my radial gradient -->
  <circle cx="5" cy="5" r="4" fill="url('#myGradient')" />
  ````