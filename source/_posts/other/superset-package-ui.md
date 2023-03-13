---
title: superset package ui
lang: other
abbrlink: 51dbe90b
date: 2023-03-08 11:59:56
tags:
---

#### 准备工作
+ MacOS 或 Linux（Windows 不受官方支持，但可能会工作）
+ nodejs 16
+ npm 7 或 8
<!-- more -->

#### 安装必须的包

```bash
npm i -g yo
cd superset-frontend/packages/generator-superset
npm i
npm link
```

#### 开始
1.新建插件的文件夹， 在文件夹下执行**yo @superset-ui/superset**
```bash
# 创建目录
mkdir /tmp/superset-plugin-chart-hello-world
# 进入目录
cd /tmp/superset-plugin-chart-hello-world
# 初始化
yo @superset-ui/superset
```

2. 插件打包
```bash
npm ci
npm run build
```

#### 添加到superset

1.要将包添加到 Superset，请转到**superset-frontend** Superset源文件夹中的子目录并运行以下命令：
```bash
npm i -S /tmp/superset-plugin-chart-hello-world
# tips： 在superset-frontend 同级目录创建的话, npm i -S ../superset-plugin-chart-hello-world
```
2.在此之后编辑superset-frontend/src/visualizations/presets/MainPreset.js并进行以下更改：
```bash
#引入插件
import { SupersetPluginChartHelloWorld } from 'superset-plugin-chart-hello-world';
# 在plugins数组中加入
new SupersetPluginChartHelloWorld().configure({ key: 'ext-hello-world' }),
```
3. superset 中查看
```bash
npm run dev 
#  或者 npm run dev-server
```
结合前篇 查看效果。


参考文档[在 Superset v2 中构建自定义 Viz 插件](https://preset.io/blog/building-custom-viz-plugins-in-superset-v2/)
[Creating Visualization Plugins](https://superset.apache.org/docs/contributing/creating-viz-plugins/)

