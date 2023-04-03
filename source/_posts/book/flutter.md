---
title: flutter 手册
lang: book
abbrlink: 2a2a7e8a
date: 2022-04-08 14:36:42
tags:
 - 手册
---


Flutter 是谷歌开源的应用开发框架，仅通过一套代码库，就能构建精美的、原生平台编译的多平台应用
中文版本文档： https://flutter.cn/

#### 常用命令：
```bash
flutter clean
flutter doctor
flutter run
flutter build apk --no-tree-shake-icons //打安卓包
```
 <!--more-->

https://docs.flutter.dev/development/ui/widgets/layout

#### 文件目录：
 代码都在lib 文件夹

#### 滚动的组件
 listView() 可以滚动的组件标签

 #### 常用标签
+ Aligin
+ AspectRatio
+ Center
+ Baseline
+ ConstrainedBox 
+ Container
+ Expanded
+ GestureDetector //手势识别
+ stack 
+ Positioned
+ Padding


#### Image vs ImageProvider
An image provider is what provides the image to an Image widget. ;D
The image provider doesn't necessarily have the image right there but it knows how to get it.

Getting an Image
If you need an Image widget, then use one of these:

Image.asset()
Image.network()
Image.file()
Image.memory()

Getting an ImageProvider
If you need an ImageProvider, then use one of these:
AssetImage()
NetworkImage()
FileImage()
MemoryImage()
Converting an ImageProvider to an Image
If you have an ImageProvider object and you want an Image widget, then do the following:

Image(
  image: myImageProvider,
)
Converting an Image to an ImageProvider
If you have an Image widget and you need its ImageProvider, then do the following:

myImageWidget.image