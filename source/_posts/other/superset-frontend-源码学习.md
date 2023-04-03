---
title: superset-frontend 源码学习
lang: other
abbrlink: 21788af3
date: 2023-03-17 15:39:29
tags:
---

#### chart
##### chart header  
控制图形的header
+ header 右边更多操作菜单
> 源码路径 \superset\superset-frontend\src\explore\components\useExploreAdditionalActionsMenu
```javascript
const menu = useMemo(
    () => (
      ...
    ))

```
useMemo：会在在组件首次加载和重渲染期间执行，执行的函数需要和渲染相关的。
useCallback：会在渲染期间执行，返回一个函数，useCallback是用来帮忙缓存函数的，当依赖项没有发生变化时，返回缓存的指针，当在依赖项变化的时候会更新，返回一个新的函数


**react-dnd** 

DndProvider
如果想要使用 React DnD，首先需要在外层元素上加一个 DndProvider。
```javascript
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

<DndProvider backend={HTML5Backend}>
    <TutorialApp />
</DndProvider>
```

+ react-dnd-html5-backend : 用于控制html5事件的backend
+ react-dnd-touch-backend : 用于控制移动端touch事件的backend
+ react-dnd-test-backend : 用户可以参考自定义backend