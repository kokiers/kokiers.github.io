---
title: ajax
categories:
  - js
tags:
  - javascript
abbrlink: c5a6a264
date: 2019-07-06 11:02:08
---

### Create a ajax

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