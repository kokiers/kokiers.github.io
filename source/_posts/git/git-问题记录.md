---
title: git 问题记录
lang: tool
abbrlink: 3afc40a1
date: 2021-12-27 13:51:32
tags:
---

不间断记录问题，做备忘。

#### fatal: Not a git repository (or any of the parent directories): .git 问题

提示说没有.git这样一个目录

在命令行 输入 git init  然后回车就好了

<!--more-->
##### OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com 443 

去掉代理 git config --global --unset http.proxy

公司代理关掉   Failed to connect to github.com port 443: Timed out


#### Github token校验

1、github 需要token 每次输入

2、不想数输入的话，可以token
git remote remove origin

git remote add origin https://${token}@github.com/xxx/xxxx.git


#### question: gitlab每次输入都要输账号密码 、、
1.重新配置了ssh key 
2.git config --global credential.helper store 


