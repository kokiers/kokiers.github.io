---
title: flutter 键盘唤起遮挡处理
lang: flutter
abbrlink: e534ecdc
date: 2022-08-11 08:49:08
categories:
 - flutter
tags:
---

键盘唤起的时候，页面比较长就会有部分被遮挡住。那就需要把规避，把被遮挡的元素展示到视图中。
监听键盘收起，用虚拟的元素撑起被键盘遮盖的元素。
<!-- more -->

```dart
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';


class ChatPage extends StatefulWidget {
  const ChatPage({Key? key, required this.arguments}) : super(key: key);
  final Map<String, dynamic> arguments;

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> with WidgetsBindingObserver {

  double _keyboardHeight = 0;
  final _targetWidgetKey = GlobalKey();
  bool isKeyboardActived = false;

  @override
  void initState() {
    _timer = null;
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    SystemChannels.textInput.invokeMethod('TextInput.hide');
    // SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: []);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeMetrics() {
    var pageHeight = MediaQuery.of(context).size.height;
    if (pageHeight <= 0) {
      return;
    }

    final keyboardTopPixels =
        window.physicalSize.height - window.viewInsets.bottom;
    final keyboardTopPoints = keyboardTopPixels / window.devicePixelRatio;
    final keyboardHeight = pageHeight - keyboardTopPoints;

    if (keyboardHeight <= 0) {
      if (isKeyboardActived) {
        isKeyboardActived = false;
        _textFocus.unfocus();
      }
      setState(() {
        _keyboardHeight = 0;
      });
      return;
    } else {
      isKeyboardActived = true;
    }
    setState(() {
      _keyboardHeight = keyboardHeight;
    });

    RenderBox? renderBox =
        _targetWidgetKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox == null) {
      return;
    }
    final bottomOffset =
        renderBox.localToGlobal(Offset(0, renderBox.size.height));
    final targetDy = bottomOffset.dy;
    final offsetY =
        keyboardHeight - (pageHeight - targetDy) + _scrollController.offset;
    if (offsetY > 0) {
      _scrollController.animateTo(
        offsetY,
        duration: kTabScrollDuration,
        curve: Curves.ease,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,//设置为false
      body: Stack(
          children: [
            listItem(),
            Positioned(
              bottom: _keyboardHeight,
              left: 0,
              right: 0,
              child: editItem(),
            ),
          ],
        ),
    );
  }
}
```