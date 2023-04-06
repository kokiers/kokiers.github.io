---
title: react-dnd
lang: react
abbrlink: 21788af3
date: 2023-03-17 15:39:29
categories:
  - react
tags:
 - react
---

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