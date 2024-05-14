---
title: js面向对象编程与继承
lang: js
categories:
  - js
abbrlink: 318077db
date: 2023-04-07 13:42:58
tags:
---

### js 面向对象编程 OOP
> 用对象的思想去写代码，就是面向对象编程。

+ 封装：针对对象属性，以及修改属性的方法进行封装；
+ 继承：你可以在创建新对象的时候继承来自上一个对象的所有属性和方法（
+ 多态：具体表现为方法重载和方法重写（ prototype ）
<!-- more -->

#### es5 

```javaScript
// 定义一只喵
function Cat(name, age, gender){
	this.name = name;
	this.age = age;
	this.gender = gender;

	this.setName = function (name){
		this.name = name
	}
	
	this.getName = function (){
		return this.name;
	}
}
// 实例化
let cat1 = new Cat('喵喵', 1, 'female');
// 新增方法
Cat.prototype.setAge = function (age){
	this.age = age
};
Cat.prototype.getAge = function (){
	return this.age;
};
cat1.setAge(2)
console.log(cat1.getAge()) 


```

#### es6

```javaScript
// 定义一只喵
class Cat {
	constructor(name, age, gender) {
	    this.name = name;
	    this.age = age;
	    this.gender = gender;
	}
	
	setName (name){
		this.name = name
	}
	
	getName (){
		return this.name;
	}
}

let cat1 = new Cat('喵喵', 1, 'female');

```


### 继承

> 所谓继承就是通过某种方式让一个对象可以访问到另一个对象中的属性和方法。

> 原型属性和方法：所有人共同使用一个
> 实例属性和方法：每个人都有一份
> 静态属性和方法：不能在类的实例上调用静态方法，而应该通过类本身调用。

#### 原型链继承: 
继承的本质就是复制，即重写原型对象，代之以一个新类型的实例。
原型链方案存在的缺点：多个实例对**引用类型**的操作会被篡改。
缺点： 继承了两个对象的属性，this的属性 + 原型的属性。
```javaScript
function parent(){
	this.name = 'hong'
}

parent.prototype.getName = function(){
	return this.name;
}

function child(){
	this.age = 20
}

// 借用父类实例对象
child.prototype = new parent()
child.prototype.getAge = function(){
	return this.age;
}

```
#### 借用构造函数继承

使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
优点：
获得父类自身成员的副本，不存在子对象修改父类对象的属性风险。
缺点：
只能继承父类的实例属性和方法，不能继承**原型属性/方法**
无法实现复用，每个子类都有父类实例函数的副本（深拷贝），影响性能

```javaScript
function parent(){
    this.color=["red","green","blue"];
}
function child(){
    parent.call(this);
}
var instance1 = new parent();
instance1.color.push("black");
console.log(instance1.color);//"red,green,blue,black"

var instance2 = new child();
console.log(instance2.color);//"red,green,blue"
```


#### 组合模式继承 -> 借用构造函数+原型继承

+ 定义：
前两种结合。即：先借用构造函数，还设置子构造函数的原型为父构造函数的实列对象。
+ 优点
1.获得父类自身成员的副本 + 父对象中可复用的功能（原型成员方式实现的）
2.子类可向父类构造函数传参
3.可安全修改自身属性 不会修改父类
+ 缺点：
实例对象instance1上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

```javascript
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  SuperType.call(this, name);//1.借用构造函数继承
  this.age = age;
}

// 继承方法 
// 构建原型链 为父类的实例
SubType.prototype = new SuperType(); 
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```


#### 原型式继承

缺点：
原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
无法传递参数
另外，ES5中存在Object.create()的方法，能够代替上面的object方法。
```javascript
function object(obj){
  // function F(){}
  // F.prototype = obj;
	// return new F();
	return Object.create(obj)
}
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(anotherPerson,person,yetAnotherPerson);   //"Shelby,Court,Van,Rob,Barbie"
```

#### 共享原型

定义：
子对象的原型设置成父对象的原型即可。
缺点： 子类或者孙类修改原型，父类会被篡改。
```js
function inherit(C,P){
  C.prototype = P.prototype
}
```

#### 临是构造函数
解决共享原型带来的篡改问题，且可以继续受益原型链的好处
```js
function inherit(C,P){
  var F = function(){}
  F.prototype = P.prototype
  C.prototype = new F();
}
```

#### 寄生式继承
核心：在原型式继承的基础上，增强对象，返回构造函数
```javaScript
function createAnother(original){
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```

#### 寄生组合式继承
结合借用构造函数传递参数和寄生模式实现继承

```javaScript
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]

```
#### ES6中class的继承（新）

```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

`Object.getPrototypeOf()`方法可以用来从子类上获取父类。可以判断一个类是否继承了另一个类。
```javaScript
class Point { /*...*/ }

class ColorPoint extends Point { /*...*/ }

Object.getPrototypeOf(ColorPoint) === Point
```

继承转载自[JavaScript常用八种继承方案 by 程序员依扬](https://juejin.cn/post/6844903696111763470)
转载自[阮一峰老师](https://es6.ruanyifeng.com/#docs/class-extends)



