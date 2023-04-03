---
title: react 基本用法
lang: react
abbrlink: 5fc4e8de
date: 2022-07-25 21:27:42
tags:
 - react
---

`npx react-native init yoAnd --template react-native-template-typescript`

```javaScript
useState
useEffect
useLayoutEffect 
```

componentWillUnmount：相当于 useEffect 里面返回的 cleanup 函数


#### hooks 
hooks 钩子,Hook 是 React 16.8 的新增特性
在 `react` 官方文档里，对 `hooks` 的定义和使用提出了 **“一个假设、两个只在”** 核心指导思想。
一个假设： 假设任何以 「use」 开头并紧跟着一个大写字母的函数就是一个 Hook。
第一个只在： 只在 React 函数组件中调用 Hook，而不在普通函数中调用 Hook。（Eslint 通过判断一个方法是不是大坨峰命名来判断它是否是 React 函数）
第二个只在： 只在最顶层使用 Hook，而不要在循环，条件或嵌套函数中调用 Hook。

转自[摸鱼的春哥](https://juejin.cn/post/7066951709678895141)


`useReducer` 和 `useState`


