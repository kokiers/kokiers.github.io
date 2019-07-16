---
title: toast
categories:
  - plugin
tags:
  - null
abbrlink: b35a6840
date: 2019-07-07 18:51:21
---

[gitHub](https://github.com/kokiers/toast-confirm)

#### Toast

+ clas: "toast-wrap",
+ text: "",
+ outTime: 1500,
+ fadeTime: 600,
+ type: 'toast',
+ btn: '好的',
+ callback: null,

默认 提示 ，1500s 自动关闭
```
var toast = new Toast({text:'确定要继续吗？'});
toast.create();
```
 

 默认 提示 ，1500s 自动关闭
```
var toast = new Toast({text:'确定要继续吗？',type:'noToast',callback:afterToast});
toast.create();

function afterToast () {
    console.log('yes');
}
```
 

### Confirm

+ clas: 'confirm-wrap',
+ cover: true,
+ title: '标题',
+ content: '正文',
+ cancel: 'cancel',
+ sub: 'ok',
+ html: '',
+ wrap: 'modal-cover',
+ cancelCall: null,
+ subCall: null,

 ```
var confim = new Confirm({
    content:'您已经中奖了',
    title:'中奖通知',
    cancel:'放弃',
    sub:'领奖',
    cancelCall:cancelTap,
    subCall:subTap
    })
    confim.create();

function cancelTap () {
    console.log('no');
}

function subTap () {
    console.log('yes');
}
 ```

 [gitHub](https://github.com/kokiers/toast-confirm)