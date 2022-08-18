---
title: tscongfig 配置
lang: tool
abbrlink: 3302cdad
date: 2022-03-11 16:19:29
tags:
---

tsconfig.json

<!--more-->
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}



import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

///自定义尺子
class RulerView extends StatefulWidget {
  //默认值
  final int value;

  //最小值
  final int minValue;

  //最大值
  final int maxValue;

  //步数 一个刻度的值
  final int step;

  //尺子的宽度
  final int width;

  //尺子的高度
  final int height;

  //每个大刻度的子刻度数
  final int subScaleCountPerScale;

  //每一刻度的宽度
  final int subScaleWidth;

  //左右空白间距宽度
  double paddingItemWidth;

  //刻度尺选择回调
  final void Function(int) onSelectedChanged;

  //刻度颜色
  final Color scaleColor;

  //指示器颜色
  final Color indicatorColor;

  //刻度文字颜色
  final Color scaleTextColor;

  //刻度文字的大小
  final double scaleTextWidth;

  //刻度线的大小
  final double scaleWidth;

  //计算总刻度数
  int totalSubScaleCount;

  RulerView({
    Key key,
    this.value = 10,
    this.minValue = 0,
    this.maxValue = 100,
    this.step = 1,
    this.width = 200,
    this.height = 60,
    this.subScaleCountPerScale = 10,
    this.subScaleWidth = 8,
    this.scaleColor = Colors.black,
    this.scaleWidth = 2,
    this.scaleTextColor = Colors.black,
    this.scaleTextWidth = 15,
    this.indicatorColor = Colors.red,
    @required this.onSelectedChanged,
  }) : super(key: key) {
    //检查最大数-最小数必须是步数的倍数
    if ((maxValue - minValue) % step != 0) {
      throw Exception("(maxValue - minValue)必须是 step 的整数倍");
    }
    //默认值 不能低于最小值 或者大于最大值
    if (value < minValue || value > maxValue) {
      throw Exception(
          "value 必须在minValue和maxValue范围内（minValue<=value<=maxValue）");
    }
    //总刻度数
    totalSubScaleCount = (maxValue - minValue) ~/ step;

    //检查总刻度数必须是大刻度子刻度数的倍数
    if (totalSubScaleCount % subScaleCountPerScale != 0) {
      throw Exception(
          "(maxValue - minValue)~/step 必须是 subScaleCountPerScale 的整数倍");
    }
    //空白item的宽度
    paddingItemWidth = width / 2;
  }

  @override
  State<StatefulWidget> createState() {
    return RulerState();
  }
}

class RulerState extends State<RulerView> {
  ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController(
      //初始位置
      initialScrollOffset:
          // （（默认值-最小值）/步长 ）=第几个刻度，再乘以每个刻度的宽度就是初始位置
          (widget.value - widget.minValue) / widget.step * widget.subScaleWidth,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width.toDouble(),
      height: widget.height.toDouble(),
      child: Stack(
        alignment: Alignment.topCenter,
        children: <Widget>[
          NotificationListener(
            onNotification: _onNotification,
            child: ListView.builder(
              physics: ClampingScrollPhysics(),
              padding: EdgeInsets.all(0),
              controller: _scrollController,
              scrollDirection: Axis.horizontal,
              itemCount: 3,
              itemBuilder: (BuildContext context, int index) {
                //2边的空白控件
                if (index == 0 || index == 2) {
                  return Container(
                    width: widget.paddingItemWidth,
                    height: 0,
                  );
                } else {
                  //刻度尺
                  return Container(
                    child: RealRulerView(
                      subGridCount: widget.totalSubScaleCount,
                      subScaleWidth: widget.subScaleWidth,
                      step: widget.step,
                      minValue: widget.minValue,
                      height: widget.height,
                      scaleColor: widget.scaleColor,
                      scaleWidth: widget.scaleWidth,
                      scaleTextWidth: widget.scaleTextWidth,
                      scaleTextColor: widget.scaleTextColor,
                      subScaleCountPerScale: widget.subScaleCountPerScale,
                    ),
                  );
                }
              },
            ),
          ),
          //指示器
          Container(
            width: 2,
            height: widget.height / 2,
            color: widget.indicatorColor,
          ),
        ],
      ),
    );
  }

  ///监听刻度尺滚动通知
  bool _onNotification(Notification notification) {
    //ScrollNotification是基类 （ScrollStartNotification/ScrollUpdateNotification/ScrollEndNotification)
    if (notification is ScrollNotification) {
      print("-------metrics.pixels-------${notification.metrics.pixels}");
      //距离widget中间最近的刻度值
      int centerValue = widget.minValue +
          //notification.metrics.pixels水平滚动的偏移量
          //先计算出滚动偏移量是滚动了多少个刻度，然后取整，在乘以每个刻度的刻度值就是当前选中的值
          (notification.metrics.pixels / widget.subScaleWidth).round() *
              widget.step;

      // 选中值回调
      if (widget.onSelectedChanged != null) {
        widget.onSelectedChanged(centerValue);
      }
      //如果是否滚动停止，停止则滚动到centerValue
      if (_scrollingStopped(notification, _scrollController)) {
        select(centerValue);
      }
    }
    return true; //停止通知
  }

  ///判断是否滚动停止
  bool _scrollingStopped(
    Notification notification,
    ScrollController scrollController,
  ) {
    return
        //停止滚动
        notification is UserScrollNotification
            //没有滚动正在进行
            &&
            notification.direction == ScrollDirection.idle &&
            scrollController.position.activity is! HoldScrollActivity;
  }

  ///选中值
  void select(int centerValue) {
    //根据（中间值-最小值）/步长=第几个刻度，然后第几个刻度乘以每个刻度的宽度就是移动的宽度
    double x =
        (centerValue - widget.minValue) / widget.step * widget.subScaleWidth;
    _scrollController.animateTo(x,
        duration: Duration(milliseconds: 200), curve: Curves.decelerate);
  }
}

///真实刻度尺View
class RealRulerView extends StatelessWidget {
  const RealRulerView({
    Key? key,
    this.subGridCount,
    this.subScaleWidth,
    this.minValue,
    this.height,
    this.step,
    this.scaleColor,
    this.scaleWidth,
    this.scaleTextColor,
    this.scaleTextWidth,
    this.subScaleCountPerScale,
  }) : super(key: key);

  //刻度总数
  final int subGridCount;

  //每个刻度的宽度
  final int subScaleWidth;

  //刻度尺的高度
  final int height;

  //刻度尺最小值
  final int minValue;

  //每个大刻度的小刻度数
  final int subScaleCountPerScale;

  //步长 一刻度的值
  final int step;

  //刻度尺颜色
  final Color scaleColor;

  //刻度尺宽度
  final double scaleTextWidth;

  //刻度线宽度
  final double scaleWidth;

  //数字颜色
  final Color scaleTextColor;

  @override
  Widget build(BuildContext context) {
    double rulerWidth = (subScaleWidth * subGridCount).toDouble();
    double rulerHeight = this.height.toDouble();
    return CustomPaint(
      size: Size(rulerWidth, rulerHeight),
      painter: RulerViewPainter(
        this.subScaleWidth,
        this.step,
        this.minValue,
        this.scaleColor,
        this.scaleWidth,
        this.scaleTextColor,
        this.scaleTextWidth,
        this.subScaleCountPerScale,
      ),
    );
  }
}

class RulerViewPainter extends CustomPainter {
  final int subScaleWidth;

  final int step;

  final int minValue;

  final Color scaleColor;

  final Color scaleTextColor;

  final double scaleTextWidth;

  final int subScaleCountPerScale;

  final double scaleWidth;

  Paint linePaint;

  TextPainter textPainter;

  RulerViewPainter(
    this.subScaleWidth,
    this.step,
    this.minValue,
    this.scaleColor,
    this.scaleWidth,
    this.scaleTextColor,
    this.scaleTextWidth,
    this.subScaleCountPerScale,
  ) {
    //刻度尺
    linePaint = Paint()
      ..isAntiAlias = true
      ..style = PaintingStyle.stroke
      ..strokeWidth = scaleWidth
      ..color = scaleColor;

    //数字
    textPainter = TextPainter(
      textAlign: TextAlign.center,
      textDirection: TextDirection.ltr,
    );
  }

  @override
  void paint(Canvas canvas, Size size) {
    //绘制线
    drawLine(canvas, size);
    //绘制数字
    drawNum(canvas, size);
  }

  ///绘制线
  void drawLine(Canvas canvas, Size size) {
    //绘制横线
    canvas.drawLine(
      Offset(0, 0 + scaleWidth / 2),
      Offset(size.width, 0 + scaleWidth / 2),
      linePaint,
    );
    //第几个小格子
    int index = 0;
    //绘制竖线
    for (double x = 0; x <= size.width; x += subScaleWidth) {
      if (index % subScaleCountPerScale == 0) {
        canvas.drawLine(
            Offset(x, 0), Offset(x, size.height * 3 / 8), linePaint);
      } else {
        canvas.drawLine(Offset(x, 0), Offset(x, size.height / 4), linePaint);
      }
      index++;
    }
  }

  ///绘制数字
  void drawNum(Canvas canvas, Size size) {
    canvas.save();
    //坐标移动（0，0）点
    canvas.translate(0, 0);
    //每个大格子的宽度
    double offsetX = (subScaleWidth * subScaleCountPerScale).toDouble();
    int index = 0;
    //绘制数字
    for (double x = 0; x <= size.width; x += offsetX) {
      textPainter.text = TextSpan(
        text: "${minValue + index * step * subScaleCountPerScale}",
        style: TextStyle(color: scaleTextColor, fontSize: scaleTextWidth),
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        new Offset(
          -textPainter.width / 2,
          size.height - textPainter.height,
        ),
      );
      index++;
      canvas.translate(offsetX, 0);
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
