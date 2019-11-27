---
lang: tool
title: git 
categories:
  - tool
abbrlink: 518e617c
date: 2019-07-07 19:35:32
tags:
  - git
---


### 本地配置
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
连接 ssh git@github.com
```
<!--more-->
### 提交
#### 添加文件
```
git add 

git add . (提交所有文件)
```

#### 查看状态
```
git status
```

#### 提交之前，先进行 fetch
```
git fetch 更新线上到本地 （相当于是从远程获取最新版本到本地，不会自动merge ）
```

#### pull
```
git pull  更新到本地并且自动merge
```

#### 提交
```
git commit -m "备注内容"
```

#### 推送
```
git push -u origin master
```

#### 切换到master分支
```
git checkout master
```

#### 将<branch>分支的代合并到master
```
git merge <branch>
```

#### 进入到要上传的仓库 添加远程地址
git remote add origin git@github.com:yourname/yourRepo.git 