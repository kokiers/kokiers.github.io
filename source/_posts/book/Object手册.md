---
title: Object手册
lang: book
abbrlink: c7a53bee
date: 2023-04-06 12:30:04
tags:
categories:
 - doc
---


Object 是 JavaScript 的一种 数据类型 。它用于存储各种键值集合和更复杂的实体。Objects 可以通过 `Object()` 构造函数或者使用 `对象字面量` 的方式创建
<!-- more -->

创建
```JavaScript
var o = new Object();// | Object() | Object(null) | Object(undefined)
var b = {} //字面量
var c = Object.create(null);
```

#### 静态方法
`Object.assign()`
通过复制一个或多个对象来创建一个新的对象。

`Object.create()`
使用指定的原型对象和属性创建一个新对象。

`Object.defineProperty()`
给对象添加一个属性并指定该属性的配置。

`Object.defineProperties()`
给对象添加多个属性并分别指定它们的配置。

`Object.entries()`
返回给定对象自身可枚举属性的 [key, value] 数组。

`Object.freeze()`
冻结对象：其他代码不能删除或更改任何属性。

`Object.getOwnPropertyDescriptor()`
返回对象指定的属性配置。

`Object.getOwnPropertyNames()`
返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

`Object.getOwnPropertySymbols()`
返回一个数组，它包含了指定对象自身所有的符号属性。

`Object.getPrototypeOf()`
返回指定对象的原型对象。

`Object.is()`
比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。

`Object.isExtensible()`
判断对象是否可扩展。

`Object.isFrozen()`
判断对象是否已经冻结。

`Object.isSealed()`
判断对象是否已经密封。

`Object.keys()`
返回一个包含所有给定对象自身可枚举属性名称的数组。

`Object.preventExtensions()`
防止对象的任何扩展。

`Object.seal()`
防止其他代码删除对象的属性。

`Object.setPrototypeOf()`
设置对象的原型（即内部 [[Prototype]] 属性）。

`Object.values()`
返回给定对象自身可枚举值的数组。


var a = {}
var b = {}
Object.is(a, b);


`Object.getOwnPropertyNames()`：返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。
`Object.getOwnPropertySymbols()`：返回一个数组，它包含了指定对象自身所有的符号属性。
上面两种方法一起 与 下面一样。
`Reflect.ownKeys()`:方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。 


Symbol.for() 会在全局注册，可以设置同一个symbol。
```js
Symbol.for("bar") === Symbol.for("bar")// true
Symbol("bar") === Symbol("bar") //fasle
// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

```

`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回false

Reflect对象一共有 13 个静态方法。

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
`Reflect.get(target, name, receiver)`: name属性部署了读取函数（getter），则读取函数的this绑定receiver。
`Reflect.set(target, name, value, receiver)`: name属性部署了读取函数（getter），则读取函数的this绑定receiver。如果是传入receiver，则触发 `Proxy.defineProperty`拦截。如无receiver。则不会触发。
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

```js
function Greeting(name,age) {
    console.log(name,age)
  this.name = name;
  this.age = age || 1
}

// new 的写法
// const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三',10]);
```

class static 方法不会被实例继承。可以被子类继承（也可以用super 调用）




