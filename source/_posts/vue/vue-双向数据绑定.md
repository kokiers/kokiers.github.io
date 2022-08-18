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
 vue2 使用 Object.defineProperty(obj, prop, descriptor)
 vue3 使用 Proxy
 <!--more-->

 ie9以上支持。所以vue 不支持ie8以下的ie浏览器。
Object.defineProperty 
描述符默认值汇总
拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
属性值和函数的键 value、get 和 set 字段的默认值为 undefined。

 ```bash

let obj = {}
let name = '12'
Object.defineProperty(obj,'name',{
    get: function(val){
        return name
    },
    set: function(val){
        //do something
        name = val
    }
});

new Proxy(obj,{
    get: function(target,key){
        return taget[key]
    }
    set: function(taget,key,val){
        taget[key] = val
        // dosomething
    }
})



 ```