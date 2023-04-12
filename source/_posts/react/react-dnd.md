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
react 实现拖拽的插件。 

DndProvider
如果想要使用 React DnD，首先需要在外层元素上加一个 DndProvider。
<!-- more -->
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


**useDrop** 拖拽结束放置的配置。

```javascript
function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x, y])

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
     ....
    </div>,
  )
}

export default BoardSquare
```

**useDrag**
让DOM实现拖拽能力的构子，官方用例如下
```javascript
import { DragPreviewImage, useDrag } from 'react-dnd';

export const Knight: FC = () => {
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.KNIGHT,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }),
        []
    );

    return (
        <>
            <DragPreviewImage connect={preview} src={knightImage} />
            <div
                ref={drag}
            >
                ♘
            </div>
        </>
    );
};
```