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

```bash
npm install -g hexo-cli
```
<!--more-->

#### 初始化

```bash
hexo init <folder>
cd <folder>
npm install
```


#### 基本指令

新建一个文章 
在根目录 source 文件夹 -> _post 文件夹创建一个文章
```bash
hexo new "My New Post"

```
新建一个分类
在根目录 source 文件夹 -> tags 文件夹 创建一个文章
```bash
hexo new page 'tags'
```
新建一个文章 到'good'文件夹（前提设置了permalink
```bash
# // source\_posts\good\hello.md
hexo new 'hello' --lang good
```
启动本地服务
```bash
hexo server
```
生成
```bash
hexo generate
```
部署到服务器
```bash
hexo deploy
```
部署之前，需要_config.yml配置
```yml
deploy:
  type: git
  repo: (你的项目地址)
```
其他命令请到[官网](https://hexo.io/zh-cn/docs/)查看文档


github 更换token 验证后需要 配置一下token 

```bash
git config --local user.name 'name'
git config --local user.password 'token'
```

报错：
typeError [ERR_INVALID_ARG_TYPE]: The "mode" argument must be integer. Received an instance of Object

应该是node 版本过高(14.x.x.)导致，更换低版本的（12.x.x）就可以解决



