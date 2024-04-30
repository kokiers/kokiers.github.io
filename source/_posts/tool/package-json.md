---
title: package-json
lang: tool
date: 2024-04-30 13:07:47
tags:
---


每个项目（npm上下载的包，或者其他的nodejs项目）的根目录下面，一般都有一个package.json文件， 定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证、如何启动项目、运行脚步等元数据）。npm install命令根据这个配置文件，自动下载所需的模块。


项目包管理对象

name 
version
description
author
private
scripts
dependencies
devDependencies
engines
browserslist