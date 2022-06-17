---
title: git 问题记录
lang: tool
abbrlink: 3afc40a1
date: 2021-12-27 13:51:32
tags:
---

不间断记录问题，做备忘。
OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com 443 
<!--more-->

去掉代理 git config --global --unset http.proxy

公司代理关掉   Failed to connect to github.com port 443: Timed out

成功了  md

token 替换密码。 90天过期。 //2021 12 27


github 需要token 每次输入

#### question: gitlab每次输入都要输账号密码 、、
1.重新配置了ssh key 
2.git config --global credential.helper store 


解决 fatal: Not a git repository (or any of the parent directories): .git 问题

提示说没有.git这样一个目录

在命令行 输入 git init  然后回车就好了

