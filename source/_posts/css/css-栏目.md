---
title: css 栏目
lang: book
categories:
  - css
abbrlink: f7605d85
date: 2023-05-18 09:34:55
tags:
---

### css 单位
#### 绝对单位
cm	厘米
mm	毫米
in	英寸 (1in = 96px = 2.54cm)
px 	像素 (1px = 1/96th of 1in)
<!-- more -->
pt	点 (1pt = 1/72 of 1in)
pc	派卡 (1pc = 12 pt)
tips: 像素（px）是相对于观看设备的。对于低 dpi 的设备，1px 是显示器的一个设备像素（点）。对于打印机和高分辨率屏幕，1px 表示多个设备像素。	
#### 相对单位
em	相对于元素的字体大小（font-size）（2em 表示当前字体大小的 2 倍）
ex	相对于当前字体的 x-height(极少使用)
ch	相对于 "0"（零）的宽度
rem	相对于根元素的字体大小（font-size）
vw	相对于视口*宽度的 1%
vh	相对于视口*高度的 1%
vmin	相对于视口*较小尺寸的 1％
vmax	相对于视口*较大尺寸的 1％
%	相对于父元素

### transition
transition是过度动画。但是transition并不能实现独立的动画，只能在某个标签元素样式或状态改变时进行平滑的动画效果过渡，而不是马上改变
属性可以被指定为一个或多个CSS属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：
`transition` 是个简写属性。`transition: property duration timing-function delay`;
transition-property: width; 
transition-duration: 1s;
transition-timing-function: linear; // linear ease ease-in ease-out ease-in-out cubic-bezier
transition-delay: 2s;

### grid 网格布局
`grid: none|grid-template-rows / grid-template-columns|grid-template-areas|grid-template-rows / [grid-auto-flow] grid-auto-columns|[grid-auto-flow] grid-auto-rows / grid-template-columns|initial|inherit;`
```css
.wrap {
  display: grid;
  grid-template-columns: repeat(7, 100px);
  /* grid-template-rows: repeat(7,50px); */
  grid-auto-rows: 100px;
}

.child1 {
  grid-column: 1 / 2; /* // grid-column-start grid-column-end 的合并简写 */
  grid-row: 1 / 4; /* // grid-row-start grid-row-end 的合并简写 */
}
```

parent:
grid-template-areas: "img content";
child: 
grid-area: img
grid-area: content;


grid-template 属性可同时设置以下属性：
grid-template-rows
grid-template-columns
grid-template-areas
grid-auto-rows
grid-auto-columns
grid-auto-flow: 默认 row  先行后列。 可以设置成column, row dense(紧密)， column dense

关键字
 `auto-fill `: grid-template-columns: repeat(auto-fill, 100px);
 `fr`: grid-template-columns: 1fr 1fr;
 `minmax()`: grid-template-columns: 1fr 1fr minmax(100px, 1fr);
 `auto`:grid-template-columns: 100px auto 100px;


justify-items 属性，
align-items 属性，
place-items 属性
justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）。place-items 是二者的简写。取值可为： start | end | center | stretch;

justify-content 属性，
align-content 属性，
place-content 属性
justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。place-content二者简写。
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;


### flex 
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性会失效。
`flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;`

```css
flex-grow: 默认0 剩余空间扩展比例，最大值1
flex-shrink: 默认1， 收缩比例
flex-basic: 默认auto 指定初始大小 优先级别大于width
```

**flex 的六大属性**

- flex-direction： row | column | row-reverse | column-reverse
- flex-wrap: nowrap（不换行） | wrap | wrap-reverse
- justify-content: center | flex-start | flex-end | space-between | space-around
- align-items: center flex-start flex-end baseline
- align-content: flex-start stretch center space-between


### css3新特性

#### 边框属性
css3新增了三个**边框属性**，分别是：
`border-radius`：创建圆角边框
`box-shadow`：为元素添加阴影
`border-image`：使用图片来绘制边框

#### background 背景属性
background-clip、
background-origin、
background-size
background-break

#### text文字相关
word-wrap: 文字换行 `word-wrap: normal|break-word;`
text-overflow： 文字超出  `text-overflow: clip|ellipsis|string`;
text-shadow: 文字阴影  `text-shadow: h-shadow v-shadow blur color;`
text-decoration: 文字划线  `text-decoration: text-decoration-line text-decoration-color text-decoration-style text-decoration-thickness|initial|inherit;`
writing-mode: 属性规定水平还是垂直地排布文本行。`writing-mode: horizontal-tb|vertical-rl|vertical-lr;`


#### transform 转换
transform属性允许你**旋转，缩放，倾斜或平移**给定元素, 应用 **2D 或 3D** 转换
transform-origin：转换元素的位置（围绕那个点进行转换），默认值为(x,y,z):(50%,50%,0)
使用方式： `transform: none|transform-functions`
`transform: translate(120px, 50%)`：位移
`transform: scale(2, 0.5)`：缩放
`transform: rotate(0.5turn)`：旋转
`transform: skew(30deg, 20deg)`：倾斜
transform-functions:
none	定义不进行转换。
matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵。
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。	
translate(x,y)	定义 2D 转换。
translate3d(x,y,z)	定义 3D 转换。	
translateX(x)	定义转换，只是用 X 轴的值。
translateY(y)	定义转换，只是用 Y 轴的值。
translateZ(z)	定义 3D 转换，只是用 Z 轴的值。	
scale(x,y)	定义 2D 缩放转换。
scale3d(x,y,z)	定义 3D 缩放转换。	
scaleX(x)	通过设置 X 轴的值来定义缩放转换。
scaleY(y)	通过设置 Y 轴的值来定义缩放转换。
scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。	
rotate(angle)	定义 2D 旋转，在参数中规定角度。
rotate3d(x,y,z,angle)	定义 3D 旋转。	
rotateX(angle)	定义沿着 X 轴的 3D 旋转。
rotateY(angle)	定义沿着 Y 轴的 3D 旋转。
rotateZ(angle)	定义沿着 Z 轴的 3D 旋转。
skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换。
skewX(angle)	定义沿着 X 轴的 2D 倾斜转换。
skewY(angle)	定义沿着 Y 轴的 2D 倾斜转换。
perspective(n)	为 3D 转换元素定义透视视图。

#### animation 动画
`animation: name duration timing-function delay iteration-count direction;`
animation-name：动画名称(@keyframes 预设动画)
animation-duration：动画持续时间
animation-timing-function：动画时间函数
animation-delay：动画延迟时间
animation-iteration-count：动画执行次数，可以设置为一个整数，也可以设置为infinite，意思是无限循环
animation-direction：动画执行方向
animation-paly-state：动画播放状态
animation-fill-mode：动画填充模式







#### 渐变
`linear-gradient`：线性渐变
`radial-gradient`：径向渐变





