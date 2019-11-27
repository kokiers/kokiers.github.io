---
lang: tool
title: hexo 搭建博客
categories:
  - tool
abbrlink: ab21860c
date: 2019-07-07 19:36:03
tags:
  - hexo
---


### [官网](https://hexo.io/zh-cn/docs/)


#### 安装hexo

```
npm install -g hexo-cli
```
<!--more-->

#### 初始化

```
hexo init <folder>
cd <folder>
npm install
```


#### 基本指令

新建一个文章 
在根目录 source 文件夹 -> _post 文件夹创建一个文章
```
hexo new "My New Post"

```
新建一个分类
在根目录 source 文件夹 -> tags 文件夹 创建一个文章
```
hexo new page 'tags'
```

启动本地服务

```
hexo server
```

生成

```
hexo generate
```

部署到服务器

```
hexo deploy
```

部署之前，需要_config.yml配置

```
deploy:
  type: git
  repo: (你的项目地址)
```


其他命令请到[官网](https://hexo.io/zh-cn/docs/)查看文档