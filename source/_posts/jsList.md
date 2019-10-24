---
title: js 合集
categories:
  - js
abbrlink: 4d191d65
date: 2019-07-16 18:24:42
tags:
---

## 数组存在
```bash
function inArray(val,arr) {
	let arlen = arr.length;	
	let test = '';		
    for (let s = 0; s < arlen; s++) {
        test = arr[s].toString();
        if (test == val) {
            return true;
        }
    }
    return false;
};
```

## 对象拷贝
```bash
function deepCopyObj(obj) { 

	let str, result = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), 
        result = JSON.parse(str); 
    } else {
        for(let i in obj){
            result[i] = typeof obj[i] === 'object' ? deepCopyObj(obj[i]) : obj[i]; 
        }
    }

    return result; 
};
```