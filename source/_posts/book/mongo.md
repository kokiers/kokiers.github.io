---
title: mongo 手册
lang: tool
abbrlink: 713dc437
date: 2021-07-21 10:05:16
tags:
 - 数据库
---

```bash
const mongoose = require('mongoose');
const { Schema } = mongoose;
```

#### 连接数据库  
+ mongoose.connect(uri, options);
ip:端口:数据库名
```bash
  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
```
+ 连接数据库的options

<!--more-->
#### type 类型有

| leixing | zuoyong  |
| --- | --- |
| String | 定义字符串 |
| Number | 定义数字  |
| Date |  定义时间 |
| Buffer | 定义二进制  |
| Boolean | 定义布尔值  |
| Mixed | 定义混合类型 |
| ObjectId | 定义对象ID |
| Array |定义数组  |
| Decimal128 | 定义字符串  |
| Map | 定义字符串  |
| Schema | 定义字符串 |

#### 定义表的结构
```bash
const schema = new Schema({
  name: String,
  score: Number,
},{
  timestamps:true 
});
//当 schema 中设置timestamps为 true 时，schema映射的文档 document 会自动添加 createdAt 和 updatedA t这两个字段，代表创建时间和更新时间

```
 定义之后需要添加字段 用 add()
```bash
var schema = new Schema()
schema.add({stuId:Number})
```
#### 保存数据
· save Model.prototype.save([options], [options.safe], [options.validateBeforeSave], [fn])
```bash
let scoreModel = mongoose.model('score',schema)
new scoreModel({
  name: 'cdfdd',
  score: 3.8
}).save((err,docs)=>{
  if (!err) {
    console.log('insert success')
  }
})
```
. create  Model.create(doc(s), [callback])
```bash
let scoreModel = mongoose.model('score',schema)
scoreModel.create({
  name: 'cdfdd',
  score: 3.8
},(err,docs)=>{
  if (!err) {
    console.log('insert success')
  }
})
```
.insertMany
```bash
let scoreModel = mongoose.model('score',schema)
scoreModel.insertMany([{
  name: 'yuyuyu',
  score: 6
},{
  name: '2344',
  score: 7
}],(err,docs)=>{
  if (!err) {
    console.log('insert success')
  }
})
````
#### 查询数据
+ Model.find(conditions, [projection], [options], [callback])
```bash
scoreModel.find({name:/cd/},{name:1},(err,docs)=>{
  if (!err) {
    console.log(docs,'?????')
  }else{
    console.log(err)
  }
})
```
+ Model.findById(id, [projection], [options], [callback])
```bash
scoreModel.find({name:/cd/},{name:1},(err,docs)=>{
  if (!err) {
    console.log(docs,'?????')
  }else{
    console.log(err)
  }
})
```

+ $where 可以使用任意的 JavaScript 作为查询的一部分，包含JavaScript 表达式的字符串或者函数
```bash
 scoreModel.find({$where:"this.name == obj.name" || "this..score == obj.score"},(err,doc) => {
   if(!err){
      console.log(doc)
  }
})
```