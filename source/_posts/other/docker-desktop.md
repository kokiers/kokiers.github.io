---
title: docker  desktop
lang: other
date: 2023-02-20 10:14:38
tags:
---

windows 使用docker 可以安装 Docker Desktop。 在配合Windows 子系统，可完成一些传统虚拟机的工作。

1. 下载 [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) 安装
2. 安装完成后，安装 WSL [wsl install](https://learn.microsoft.com/zh-cn/windows/wsl/install)
   ```bash
   //power shell 
    wsl --list --online //查看可安装的列表
    wsl --install -d installone //
    wsl --update
   ```
3. 运行docker desktop 使用


错误处理：
error during connect: 
This error may indicate that the docker daemon is not running.: 
Get "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/containers/json": 
open //./pipe/docker_engine: The system cannot find the file specified.

解决：
   进入C盘 C:\Program Files\Docker\Docker
dockercli.exe -switchdaemon 

