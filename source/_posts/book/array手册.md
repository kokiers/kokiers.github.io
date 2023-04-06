---
title: array 数组
categories:
  - doc
abbrlink: 2eaa9655
date: 2019-07-17 10:42:05
tags:
---

创建数组：
```javaScript
var arr  = [];
var arr1 = array();
var arr2 = new Array();
```

通过索引访问数组元素： arr[0]

删除末尾：pop();删除数组的最后一个元素，并返回这个元素。
删除头部：shift();删除数组的第一个元素，并返回这个元素。
添加到数组头部：unshift();
通过索引删除：arr.splice(index,n); 
返回选定元素：arr.slice(start,end); start 必需。
push();在数组的末尾增加一个或多个元素，并返回数组的新长度。
reverse()；颠倒数组中元素的排列顺序
sort();对数组元素进行排序，并返回当前数组。

Array.of(); 
Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。

Array.isArray(obj)  于确定传递的值是否是一个 Array。
如果对象是 Array，则为true; 否则为false。

fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
arr.fill(value[, start[, end]])

Array.prototype.indexOf()
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
Array.prototype.lastIndexOf()
返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。


arr.forEach((item,index,arr)=>{}); 没有办法中止或者跳出 forEach() 循环


参考：
[isArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
