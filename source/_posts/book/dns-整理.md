---
title: dns 整理
lang: book
abbrlink: d099dabd
date: 2022-10-14 12:09:35
categories:
  - doc
tags:
---


www.google.com.cn 
三级域名.二级域名.顶级域(通用顶级域，国家地区顶级域)
##域名

###顶级域名（TLD）：域名系统中的最高级别，位于域名最右边，通常由几个字母组成。
TLD分为`通用TLD`和`国家代码TLD`，

<!-- more -->

常见的通用TLD包括
+ .com用于商业企业
+ .net用于网络提供商
+ .org用于非营利组织
国家代码TLD代表特定国家或地区，如.cn代表中国和.uk代表英国。

### 二级域名（SLD）
位于TLD之下，由注册者选择并注册，可以是一个个性化和易记的名称

### 三级域名（3LD）
位于二级域名之下，通常用于指向特定服务器或子网

根据这个定义，我们可以将localhost视为一个顶级域名，尽管是一个保留的，仅用于访问当前计算机的顶级域名。


常用的`IPv4私有IP地址`范围分为三个类别：
A类：从10.0.0.0到10.255.255.255
B类：从172.16.0.0到172.31.255.255
C类：从192.168.0.0到192.168.255.255

前端之优化 DNS预解析
DNS Prefetch，即DNS预获取，是前端优化的一部分。一般来说，在前端优化中与 DNS 有关的有两点：
 + 减少DNS的请求次数
 + DNS预获取 

 目前大多数浏览器已经支持此属性，支持版本如下：

– Safari: 5+
– Chrome: All
– Firefox: 3.5+
– Opera: Unknown
– IE: 9+ (called “Pre-resolution” on blogs.msdn.com)

```html
<meta http-equiv="x-dns-prefetch-control" content="on">// 如需关闭  改成off
<link rel="dns-prefetch" href="//www.img.com">
<link rel="dns-prefetch" href="//www.api.com">
```