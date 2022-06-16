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
加上了 –u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来
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
git remote add origin https://github.com/yourname/yourRepo.git

git stash pop stash@{1}

#### 分支 
```
git checkout -b dev 
git checkout 命令加上 –b参数表示创建并切换，相当于如下2条命令
git branch dev
git checkout dev
```

#### 回退版本
```
git reset --hard HEAD^  回退一个版本
git reset --hard HEAD~100 回退100个版本
git reset --hard 6fcfc89 回退到版本 6fcfc89
```

#### 撤销文件修改
git checkout --readme.txt

#### 建立关联
 git push --set-upstream origin branch_name

#### 忽略不一致的
 git pull origin branch_name --allow-unrelated-histories

fatal: refusing to merge unrelated histories


git pull origin branch_name --allow-unrelated-histories

