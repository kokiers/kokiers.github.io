---
lang: tool
title: gulp
categories:
  - tool
tags:
  - gulp
abbrlink: 4cc2ef8a
date: 2018-08-01 11:08:41
---

#### 详情请戳 [官网](https://gulpjs.com/)

#### 必要装备：
+ nodejs 
+ npm

##### install
<!--more-->

``` bash
npm install --global gulp-cli
```

##### Create a gulpfile
使用方法 
安装压缩js gulp-uglify
gulp.task('ugpop'） 调用这个 task ： gulp ugpop 即可。
一般有 gulp.task('default'） 可以执行 ：gulp 即可

``` bash
var gulp = require('gulp');
var uglify = require('gulp-uglify')


gulp.task('default', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/'));
});

```
