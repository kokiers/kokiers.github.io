---
title: docker desktop
lang: other
abbrlink: 139433de
date: 2023-02-20 10:14:38
tags:
- 工具推荐
---

windows 使用docker 可以安装 Docker Desktop。 在配合Windows 子系统，可完成一些传统虚拟机的工作。

### windows 安装docker destop

1. 下载Windows 版本 [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) 安装
   <!-- more -->
2. 安装完成后，安装 WSL [wsl install](https://learn.microsoft.com/zh-cn/windows/wsl/install)
3. 安装 Ubuntu 子系统
```bash
   wsl --list --online //查看可安装的列表
   wsl --install -d installone //
   wsl --update
``` 
tips: 2，3步骤 **power shell** 中运行。需要开启**虚拟化**！！！！


3. 运行docker desktop 使用

 **常见错误处理**
+ 错误1：error during connect: 
   This error may indicate that the docker daemon is not running.: 
   Get "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/containers/json": 
   open //./pipe/docker_engine: The system cannot find the file specified.

   解决：
   进入C盘 C:\Program Files\Docker\Docker
   dockercli.exe -switchdaemon  （确认docker desktop 启动了）

+ 错误2.superset 本地起开发 docker compose up 报错。
 A Default SECRET_KEY was detected, please use superset_config.py to override it.
 Use a strong complex alphanumeric string and use a tool to help you generate 
 a sufficiently random sequence, ex: openssl rand -base64 42

 解决： 安装 python -m pip install markupsafe=2.0.1  
 不成功 呜呜

