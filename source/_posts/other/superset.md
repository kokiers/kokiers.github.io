---
title: superset
lang: other
abbrlink: 7b3ed7b3
date: 2023-02-14 10:45:06
tags:
---


常年使用Windows，最近需要使用superset，不支持windows，所以安装一个虚拟机，记录一下吧。

#### 系统准备 

1.VMware .exe 程序
2.Ubuntu .iso 镜像

windows 10 下载，安装教程 ，详细查看[csdn 小玉](https://blog.csdn.net/weixin_43525386/article/details/108920902) 教程。

#### docker
+ [安装docker](https://docs.docker.com/engine/install/)
+ [Ubuntu 上安装docker](https://docs.docker.com/engine/install/ubuntu/)
+ 再安装 docker-compose
    ```bash
    sudo apt-get update
    sudo apt-get install docker-compose-plugin
    ```

  docker 常用命令
```bash
docker ps //查看所有启动的容器
doker ps -a //查看所有容器 启动 + 未启动
docker start myDocker
docker stop myDocker
```
#### 启动

```bash
git clone https://github.com/apache/superset.git 
cd superset
docker-compose -f docker-compose-non-dev.yml pull
docker-compose -f docker-compose-non-dev.yml up

```
 在浏览器中 访问  http://localhost:8088 

