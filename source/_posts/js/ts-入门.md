---
title: ts 入门
lang: js
abbrlink: a320a954
date: 2022-08-18 20:41:32
categories:
  - ts
tags:
---

TypeScript 作为javaScript 的超集，它可以编译成普通的JavaScript代码，简称TS。
TS 是编译型预言，在编写阶段可规避错误。javaScript是解释型语言，在运行中才有可能暴露错误。
<!-- more -->
#### 安装
针对使用npm的用户：`npm install -g typescript`

#### 编译
> greet.ts
```ts
function greeter(person) {
    return "Hello, " + person;
}
let user = "Jane User";
document.body.innerHTML = greeter(user);

```
在命令行上，运行TypeScript编译器：`tsc greet.ts` 输出一个 `greet.js`
#### 类型
 + 普通类型：
    number 
    boolean 
    array 
    string 
    Tuple(元组类型允许表示一个已知元素数量和类型的数组,各元素的类型不必相同)
    enum
    any
    Void (函数没有返回值的时候)
    Null 和 Undefined（默认情况下null和undefined是所有类型的子类型）
    Never （never类型表示的是那些永不存在的值。never类型是任何类型的子类型）
    Object（表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。）
+ 泛型
+ 回调函数类型 (写上函数返回类型)
  无返回值使用： void 
+ 重载与回调函数

#### 类型断言
+ 尖括号 
+ as 
```javaScript
let str:any = 'abc';
let strLen:number = (<sting>str).length
let strLen:number = (str as string).length
```
这两种断言都可。但是当在jsx中使用，只允许用as

类型别名声明（type sn = number | string;）
接口声明（interface I { x: number[]; }）
类声明（class C { }）
枚举声明（enum E { A, B, C }）
指向某个类型的import声明


#### 声明： declare
模块结构声明： declare 
+ module-function.d.ts (可做函数调用)
+ modeul-class.d.ts (可用new 构造)
+ module.d.ts (不能调用或者构造)


#### interface type
interface 侧重描述数据结构。
type 侧重描述类型. 二者都可描述对象 函数，都可extends。
平时开发中，一般使用组合或者交叉类型的时候，用 type。
一般要用类的 extends 或 implements 时，用 interface。
```javaScript
// # interface
interface Man{
    age: number
}

interface Woman extends Man{
    sex: string
}

// # type
type Dog{
    age: number
}
type Animal = Dog & {
    sex: string
}

// # type extends interface
type nAnimal = Man & {
    sex: string
}

// # interface extends type
interface nAnimal extends Dog{
    sex: sting
}

```

##### 不同点

+ type可，interface 不行
  可用声明基本类型，联合类型，交叉类型，元组。 
+ interface 可以 type 不行
  合并重复声明. type 的话会报错，不合法。
```javascript
interface Person {
    name: string
}

interface Person {         // 重复声明 interface，就合并了
    age: number 
}

const person: Person = {
    name: 'lin',
    age: 18
}
```


#### 函数参数类型
 + 必传参数，可选参数
 + 联合类型
 + any
 ```javaScript
function doSome(a: number | string, b: string, c?：number, d: any){

}
```

#### 函数重载
把精确得放在前面，不精确的在后面
```javaScript
function compile(a:string,b:string): string

function compile(a: number, b:number):number

function compile(a:any,b:any){
    
    return a + b
}

```

