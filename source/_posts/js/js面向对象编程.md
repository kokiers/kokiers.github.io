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

child.prototype = new parent()
child.prototype.getAge = function(){
	return this.age;
}

```
#### 借用构造函数继承

使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
缺点：
只能继承父类的实例属性和方法，不能继承**原型属性/方法**
无法实现复用，每个子类都有父类实例函数的副本，影响性能

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


#### 组合模式继承

+ 定义：
组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。
+ 缺点：
实例对象instance1上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

#### 共享原型继承

+ 原型式继承


+ 寄生式继承

+ 寄生组合式继承
结合借用构造函数传递参数和寄生模式实现继承
+ ES6中class的继承（新）

```javaScript
function Parent() {
  this.parentName = '父类';
}
Parent.prototype.getParentName = function() {
  return this.parentName;
};

function Child() {
  this.childName = '子类';
}
Child.prototype = new Parent();
// Child.prototype.getChildName = function() {
//   return this.childName
// };

var c = new Child();
console.log(c.getParentName()); // '父类'
```
