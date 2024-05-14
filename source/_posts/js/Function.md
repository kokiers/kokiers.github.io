---
title: Function
lang: js
abbrlink: 33d8746b
date: 2024-04-28 14:13:24
tags:
---


### Funtion
函数是第一类对象，可以提供作用域。
函数就是对象。
+ 函数可以动态创建
+ 函数可以分配给变量，可扩展， 大部分可以被删除
+ 可以作为函数参数传递给其他函数，也可以有其他函数返回
+ 拥有自己的属性+方法

<!-- more -->
```js
// 命名函数
var add = function add(){
}

// 函数表达式,又名匿名函数
var add = function (){
}
```
#### 实例属性：
`Function.prototype 被所有 Function 实例共享。`
+ Function.prototype.arguments 表示传递给该函数的参数 （对于严格模式、箭头函数、异步函数和生成器函数，访问 arguments 属性会抛出 TypeError 异常。）
+ Function.prototype.caller 表示调用该函数的函数 （（对于严格模式、箭头函数、异步函数和生成器函数，访问 caller 属性会抛出 TypeError 异常。）
+ Function.prototype.constructor 创建实例对象的构造函数
`以下是每个函数得自有属性：`
+ length：指定函数期望的参数个数。
+ name：函数的名称。
+ prototype：在使用 function 作为构造函数与 new 运算符一起使用时，用作新对象的原型。

#### 实例方法
+ Function.prototype.apply()：使用给定的 this 值和可选的参数数组（或类数组对象）作为参数来调用一个函数。
+ Function.prototype.bind()：创建一个新的函数，在调用时，其 this 关键字被设置为提供的值，可选地在调用新函数时在提供的参数之前加上一系列给定的参数。
+ Function.prototype.call()： 使用给定的 this 值和可选参数调用一个函数。
+ Function.prototype.toString()： 返回表示函数源代码的字符串。重写了 Object.prototype.toString 方法。
+ Function.prototype[@@hasInstance]()：指定确定构造函数是否将对象识别为其实例的默认过程。由 instanceof 运算符调用。