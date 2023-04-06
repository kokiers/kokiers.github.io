---
title: flutter 生成图片与保存
lang: flutter
abbrlink: df55c9c4
date: 2022-12-08 11:10:56
categories:
 - flutter
tags:
---

#### 图片生成 

<!-- more -->
##### 截图生成 

```bash

```

##### 在屏幕外（不可见区域）渲染生成图片
```dart
// Creates an image from the given widget by first spinning up a element and render tree,
/// then waiting for the given [wait] amount of time and then creating an image via a [RepaintBoundary].
/// [widget] 需要获取截图的widget
///[imageSize] widget的size，推荐使用dp
///[wait] widget截屏延时，widget构建时如果有耗时操作，可以添加延时防止截屏时耗时操作尚未完成
/// https://github.com/flutter/flutter/issues/40064#issuecomment-620081426
Future<Uint8List?> createImageFromWidget(Widget widget,
    {Duration? wait, required Size imageSize}) async {
  try {
    var devicePixelRatio = window.devicePixelRatio;
    final RenderRepaintBoundary repaintBoundary = RenderRepaintBoundary();
    final RenderView renderView = RenderView(
      window: PlatformDispatcher.instance.views.single,
      child: RenderPositionedBox(
          alignment: Alignment.center, child: repaintBoundary),
      configuration: ViewConfiguration(
        size: imageSize,
        devicePixelRatio: devicePixelRatio,
      ),
    );

    final PipelineOwner pipelineOwner = PipelineOwner();
    final BuildOwner buildOwner = BuildOwner(focusManager: FocusManager());

    pipelineOwner.rootNode = renderView;
    renderView.prepareInitialFrame();
    final RenderObjectToWidgetElement<RenderBox> rootElement =
        RenderObjectToWidgetAdapter<RenderBox>(
            container: repaintBoundary,
            child: Directionality(
              textDirection: TextDirection.ltr,
              child: widget,
            )).attachToRenderTree(buildOwner);
    if (wait != null) {
      await Future.delayed(wait);
    }
    buildOwner.buildScope(rootElement);
    buildOwner.finalizeTree();

    pipelineOwner.flushLayout();
    pipelineOwner.flushCompositingBits();
    pipelineOwner.flushPaint();
    final /*ui.Image*/ image =
        await repaintBoundary.toImage(pixelRatio: devicePixelRatio);
    final ByteData? byteData =
        await image.toByteData(format: ImageByteFormat.png);
    return byteData?.buffer.asUint8List();
  } catch (e) {}
  return null;
}
```
