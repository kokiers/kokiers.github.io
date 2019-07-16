---
title: url 分割
categories:
  - js
abbrlink: 7598ef0d
date: 2019-07-16 15:17:46
tags:
---

### url 分割query
```bash
function splitParam(href) {
    href = href || location.search;
    var arr={},
    reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
    href && href.replace(reg,function( $0, $1, $2, $3 ){
        arr[$1] = $3;    
    });
    return arr;
}
```

### url 分割query
保留部分参数
```bash
function addParam(href) {
    href = href || location.search;
    var name = ['f','ref','isapp','ssc','usc','td','dgfromsource','_vs'],
    str='',
    arr={},
    reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
    href && href.replace(reg,function( $0, $1, $2, $3 ){
        if (name.includes($1)) {            
            arr[$1] = $3;
        }        
    });
    for(var i in arr){
        str +=  i + '=' + arr[i] + '&';
    }
    if (str.length) {
        str = str.substring(0, str.length-1);
    }
    return str;
}
```

### a标签 解析 url
```bash
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port || '80',
        query: a.search,
        params: (function() {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; } s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace(' #', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}
```