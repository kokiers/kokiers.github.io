---
title: superset
lang: other
abbrlink: 7b3ed7b3
date: 2023-02-14 10:45:06
tags:
---


### 使用docker compose 安装
常年使用Windows，最近需要使用superset，不支持windows，所以安装一个虚拟机，记录一下吧。
#### 系统准备 

1.VMware .exe 程序
2.Ubuntu .iso 镜像

windows 10 下载，安装教程 ，详细查看[csdn 小玉](https://blog.csdn.net/weixin_43525386/article/details/108920902) 教程。

```bash
free -h  //查看内存
stop //实时查看内存使用

sudo apt-get install xxxx //在线安装
sudo apt-get remove xxxx //卸载
sudo apt-get update 

```

#### docker
+ [安装docker](https://docs.docker.com/engine/install/)
+ [Ubuntu 上安装docker](https://docs.docker.com/engine/install/ubuntu/)
+ 再安装 docker-compose
    ```bash
    sudo apt-get update
    sudo apt-get install docker-compose-plugin
    ```


#### 启动

```bash
git clone https://github.com/apache/superset.git 
cd superset
docker-compose -f docker-compose-non-dev.yml pull
docker-compose -f docker-compose-non-dev.yml up
```
内存不够再重新安装的时候，docker-compose(V1,2023.6之后不再支持) 命令不行，改成 docker compose (V2的语法), [更多语法](https://docs.docker.com/compose/reference/)

 在浏览器中 访问  http://localhost:8088 

 以上是生产环境的启动方法。本地修改代码，不会生效。


##### docker 常用命令
```bash
docker ps //查看所有启动的容器
docker ps -a //查看所有容器 启动 + 未启动
docker start myDocker
docker stop myDocker
docker rm myDocker
docker images //查看镜像
docker rmi myImageId 
```

删除，停止所有容器，在windows cmd 一下命令不能生效。用git bash ，
docker rm $(docker ps -aq)
docker stop $(docker ps -q) //停止

或者power shell docker ps -q | % { docker stop $_ } // 未尝试

### docker compose 常用命令

```bash
docker 
docker-compose up --detach --build //修改代码重新build
```

#### 本地开发

官风提示需要一个superset_config.py 文件来定义需要修改的配置项。
我直接在config.py 下直接改。

```bash
docker 
docker-compose up --detach --build //修改代码重新build
docker compose pull 
docker compose up 

```

碎碎念：
尝试了好几个办法，就想本地撸一下superset 怎么这么难啊！！ 
1.虚拟机下Linux系统，直接用docker compose up. 修改本地代码生效了？
2.windows系统下  安装docker destop，使用本地代码，但是总是重启。有问题。
3.虚拟化python环境 ，安装 Microsoft visual c++ build tools 一直安装失败！！！！




### python 虚拟环境

[文档](https://superset.apache.org/docs/installation/installing-superset-from-scratch)
1、安装python 下载exe安装 //配置环境变量

2、pip install virtualenv 
3、py -3 -m venv venv //python3 -m venv venv (在项目目录下执行)
 错误： 
 ，python3 不是内部外部命令，不能识别。用 **py -3** 代替。如果需要使用，需要复制python.exe 后重命名 python3.exe
4、venv\Scripts\activate //. venv/bin/activate 开启虚拟化
5、 pip install apache-superset==2.0.1 --use-deprecated=legacy-resolver
安装过程中各种错误，安装如下可解决。
需要额外下载好visual studio 的相关插件。![详情如图](../../images/superset_20230304172137.jpg)
错误1：
fatal error C1083: Cannot open include file: 'basetsd.h'致命错误 C1083：无法打开包含文件：“basetsd.h”
fatal error C1083: 无法打开包括文件: “basetsd.h”: No such file or directory
错误2.
 error: command 'D:\\visual studio\\VC\\Tools\\MSVC\\14.31.31103\\bin\\HostX86\\x64\\cl.exe' failed with exit code 2
 错误3.
 error: legacy-install-failure
 错误4.
 src/geohash.cpp(2): fatal error C1083: 无法打开包括文件: “stdio.h”: No such file or directory
 错误5.
  Command errored out with exit status 1:
错误6.
  pip is looking at multiple versions of dnspython to determine which version is compatible with other requirements. This could take a while.

6、安装requirements.txt 
错误：
ERROR: Could not open requirements file: [Errno 2] No such file or directory: ‘requirments.txt’
  先执行pip freeze > requirements.txt//会在当前目录下生成文件。 管理包版本
然后再pip install -r requirements.txt

一直各种包之间冲突，没有成功，在issue上看到分享说，2.0.1版本在3.9以上不能成功配置，有网友分享3.8可用，在尝试ing
各种倒腾，到最后说网络不行，不能 superset load_examples。 郁闷死。。。
继续进行下一步，起来了，但是登录上去是坏的。。。



pip uninstall cryptography
pip install cryptography==2.9.2 -i https://pypi.douban.com/simple/
pip install sqlalchemy-utils==0.36.6 -i https://pypi.douban.com/simple/





切换python版本，[参照文档](https://blog.csdn.net/qq_42455308/article/details/129263694)
安装不一样的版本，可切换版本使用。再走一遍。

python38 install virtualenv

错误：ERROR: After October 2020 you may experience errors when installing or updating packages 
解决：pip install apache-superset --use-feature=2020-resolver

pip install sqlalchemy-utils==0.36.6 --use-feature=2020-resolver -i https://pypi.douban.com/simple/



错误：
使用pip 安装插件的时候，出现下面的警告信息：
WARNING: Ignoring invalid distribution -ip (e:\python\python_dowmload\lib\site-packages)

解决办法：
找到警告信息中报错的目录，然后删掉~开头的文件夹，那种事之前安装插件失败/中途退出，导致插件安装出现异常导致的，虽说警告信息不影响，但是有强迫症 哈哈 。把文件夹删掉就好了 ：




