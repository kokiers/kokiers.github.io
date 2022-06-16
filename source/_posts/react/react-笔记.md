---
title: react 笔记
lang: js
abbrlink: feeb1b0a
date: 2021-12-23 14:48:46
tags:
---

#### 1、样式
  组件的局部样式，类似vue的 scoped

+ 样式文件 xx.module.css
  ```
  .mystyle{
    color: red
  }
  ```
<!--more-->
+ 组件import 
  ```
    import styles from './xx.module.css'
  ```
+ 组件使用
  ```
  <div className={styles.mystyle}></div>
  ```
+ 重写组件的外部样式（比如antd的样式），但仅仅本组件生效
  ```
  .mystyle{
    :global .ant-btn{
      color: red
    }
  }
  ```

<!-- todo -->
  Can't perform a React state update on an unmounted component.



