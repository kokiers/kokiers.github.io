---
title: 实用正则合集
categories:
  - js
abbrlink: 7deedbc9
date: 2019-07-16 17:18:54
tags:
---

### 匹配英文
```bash
var str = /[^a-zA-Z]/g;
var test = '77hhs';
test.replace(str,'');//hhs
```
### 匹配中文
```bash
var str = /[^\u4E00-\u9FA5]/g
```
### 空格
```bash
var str = /^ +| +$/g;
```
### 空格
```bash
var str = /^1[34578][0-9]{9}$/;
```
 
### 邮箱
```bash
var str = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
```
### 身份证
```bash
var preg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
if (!preg.test(idCard)) {
    console.log('不合格' + idCard);
    return
} else {
    if (idCard.length == 18) {
        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
        var idCardY = new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); 
        var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和 
        for(var i=0;i<17;i++) { 
        	idCardWiSum += idCard.substring(i,i+1)*idCardWi[i]; 
        } 
        var idCardMod = idCardWiSum%11;
        var idCardLast = idCard.substring(17);//得到最后一位身份证号码 //如果等于2，则说明校验码是10，身份证号码最后一位应该是X 
        if(idCardMod==2){ 
        	if(idCardLast=="X" ||idCardLast=="x" ){
        	 alert("恭喜通过验证啦！"); 
        	}else{ 
        		alert("身份证号码错误！"); 
        	} 
        }else{ //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码 
        	if(idCardLast==idCardY[idCardMod]){ 
        		alert("恭喜通过验证啦！"); 
        	}else{ 
        		alert("身份证号码错误！"); 
        	}
        } 
    }else{ 
    	alert("身份证格式不正确!"); 
    } 
}

```