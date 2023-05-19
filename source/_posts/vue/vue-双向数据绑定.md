---
title: vue 双向数据绑定
lang: vue
abbrlink: 7ed06d07
date: 2022-08-13 19:18:59
tags:
categories:
  - vue
---
 
双向数据绑定： 
 vue2 使用 `Object.defineProperty(obj, prop, descriptor)`做数据劫持，进行监听，进行双向数据绑定。
 vue3 使用 `Proxy` `Proxy(obj, prop, value)`Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。[mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 <!--more-->

 ie9以上支持。所以vue 不支持ie8以下的ie浏览器。
`Object.defineProperty` 
描述符默认值汇总
拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。


<!-- more -->
```javaScript
var o = {}; // 创建一个新对象

// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});

var bValue = 38;
Object.defineProperty(o, "b", {
  // 使用了方法名称缩写（ES2015 特性）
  // 下面两个缩写等价于：
  // get : function() { return bValue; },
  // set : function(newValue) { bValue = newValue; },
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable : true,
  configurable : true
});

```

下面通过2个例子进行比较，期望： input 输入框的值同步在span中。
> html 
```html
<input type="text" id="in">
<span id="p1"></span>
```

> Object.defineProperty
```javaScript
var inputName = document.getElementById('in');
    var spanName = document.getElementById('p1');
    var num = 0;

    var student = {};
    Object.defineProperty(student, 'name', {
      get: function() {
        return val;
      },

      set: function(val) {
        spanName.innerHTML = val;
      }
    });
    inputName.oninput = function() {
      student.name = this.value;
    }
```

> proxy
```javaScript
var inputName = document.getElementById('in');
var spanName = document.getElementById('p1');

var student = {};
var proxy = new Proxy(student, {
    get: function(target, prop) {
        return target[prop];
    },

    set: function(target, prop, value) {
        target[prop] = value;
        observer();
    }
    });

    function observer() {
    inputName.value = student.name;
    spanName.innerHTML = student.name;
    }

    inputName.oninput = function() {
    proxy.name = this.value;
    }



    var b = {
      text: 21
    }

    Object.defineProperty(b,'text',{
      get: function(target,value){
        return 99
      }
    })

    // b = new Proxy(b,{
    //   get: function(target,prop){
    //     console.log(target,prop == 'text')
    //     if (prop == 'text') {
    //       return 99
    //     }else{
    //       return target[prop]
    //     }
    //   },
    //   set:function(target,prop,value){
    //     console.log('set',target,value)
    //     target[prop] = value
    //   }
    // })

    b.text = 34

    console.log(b.text === 99) //为真


    foo
    local
    foo2


    var name = 'global';
var obj = {
    name: 'local',
    foo: function(){
      console.log(this,'aaaa')
        this.name = 'foo';
    }.bind(window)
};
var bar = new obj.foo();
setTimeout(function() {
    console.log(window.name,'window');
}, 0);
console.log(bar.name,'bar');
  
var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name,'2');

setTimeout(() => console.log('a'));
Promise.resolve().then(
   () => console.log('b')
 ).then(
   () => Promise.resolve('c').then(
     (data) => {
       setTimeout(() => console.log('d'));
       console.log('f');
       return data;
     }
   )
 ).then(data => console.log(data));

b
a 
f
c
d
```