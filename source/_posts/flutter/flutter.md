---
title: flutter
lang: js
abbrlink: 2a2a7e8a
date: 2022-04-08 14:36:42
tags:
---

命令：
flutter run

文件目录：
 代码都在lib 文件夹

组件 标签
 listView() 可以滚动的组件标签
 <!--more-->

定义一个 Widget 组件 
```dart
Widget textSection = const Padding(
  padding: EdgeInsets.all(32),
  child: Text(
    'Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese '
    'Alps. Situated 1,578 meters above sea level, it is one of the '
    'larger Alpine Lakes. A gondola ride from Kandersteg, followed by a '
    'half-hour walk through pastures and pine forest, leads you to the '
    'lake, which warms to 20 degrees Celsius in the summer. Activities '
    'enjoyed here include rowing, and riding the summer toboggan run.',
    softWrap: true,// By setting softwrap to true, text lines will fill the column width before wrapping at a word boundary.
  ),
);
```


https://docs.flutter.dev/development/ui/widgets/layout


### Single-child layout widgets

+ Aligin

```dart
Container(
    height: 120.0,
    width: 120.0,
    color: Colors.blue[50],
    child: const Align(
      alignment: Alignment(0.2, 0.6),
      child: FlutterLogo(
        size: 60,
      ),
    ),
  ),

alignment: Alignment.topRight,
           Alignment(0.2, 0.6), 
           FractionalOffset(0.2, 0.6), 

Alignment
(0.2 * width of FlutterLogo/2 + width of FlutterLogo/2, 0.6 * height of FlutterLogo/2 + height of FlutterLogo/2) = (36.0, 48.0).

FractionalOffset
(0.2 * width of FlutterLogo, 0.6 * height of FlutterLogo) = (12.0, 36.0) in the coordinate system of the blue container.
(0.2 * width of Align, 0.6 * height of Align) = (24.0, 72.0) in the coordinate system of the Align widget.
 placed at (24.0, 72.0) - (12.0, 36.0) = (12.0, 36.0）
```

+ AspectRatio
+ Center
+ Baseline
+ ConstrainedBox 
+ Container
+ Expanded


手势识别。
GestureDetector 
```dart
 Positioned(
  right: 24 - rL,
  bottom: 54 - rB,
  child: GestureDetector(
    child: const Icon(
      Icons.highlight_alt,
      color: Colors.white,
    ),
    onPanStart: (_) => {
      setState(() => _isSumbnail = true),
    },
    onPanEnd: (e) => {
      setState(() => _isSumbnail = false),
    },
    onPanUpdate: (upDetail) {
      // setState(() {

      // });
      print('start');
      setState(() {
        rL = upDetail.localPosition.dx;
        rB = upDetail.localPosition.dy;
      });

      print(upDetail.localPosition);
      print(upDetail.delta);
      print('end');
    },                                
  )),
```


  Image vs ImageProvider
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





flutter 获取应用签名 （需要jre 低版本才能查看md5）
keytool -list -v -keystore D:\XX\key.jks


