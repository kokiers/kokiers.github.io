---
title: 分割字符串
categories:
  - js
abbrlink: 1459c89f
date: 2019-07-16 17:11:52
tags:
---

### 字符串分隔空格
```bash
function andleSplit(str){
    var temp = str.split(/[\s+,]/g);
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "") {                    
            temp.splice(i, 1);
            i--;
        }
    }
    return temp;
}
```
### string 替换
```bash
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
var template1="我是{0}，今年{1}了,biubiubiu{2}";
var result1=template1.format("loogn",22,9090);
```

### 数字千分位格式化
```bash
function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
```