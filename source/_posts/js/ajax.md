---
lang: js
title: 原生ajax
categories:
  - js
tags:
  - ajax
abbrlink: c5a6a264
date: 2019-07-06 11:02:08
---

### Create a ajax

<!--more-->
``` bash
if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
} else if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
}
xhr.open("post",url, true);
xhr.onload = function (evt){
    var data = JSON.parse(evt.target.responseText);
    // TODO AFTER
    console.log(data) 
}
xhr.onerror =  function () {
    console.log('ERROR')
};
xhr.upload.onloadstart = function(){
    console.log('start');
};
xhr.send(form);

```
### form data
有了它 ，可以轻轻松松把数据传给后端。
[MDN formData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)
```bash
let formData = new FormData(); 
formData.append('username', 'Chris');
```