---
title: gulp
date: 2019-07-07 11:08:41
categories:
- tool
tags:
- gulp
---

#### 详情请戳 [官网](https://gulpjs.com/)

前提需要安装 node npm

##### install

``` bash
npm install --global gulp-cli
```


#### Create a gulpfile
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
