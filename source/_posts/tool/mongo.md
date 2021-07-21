---
title: mongo
lang: tool
abbrlink: 713dc437
date: 2021-07-21 10:05:16
tags:
---

```bash
const mongoose = require('mongoose');
const { Schema } = mongoose;
```

连接数据库  ip:端口:数据库名
```bash
  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
```
type 类型有

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

定义表的结构
```bash
const schema = new Schema({
  name: String,
  score: Number,
},{
  timestamps:true 
});

```

let scoreModel = mongoose.model('score',schema)
scoreModel.create({
  name: 'cdfdd',
  score: 3.8
},(err,docs)=>{
  console.log(err,docs)
  if (!err) {
    console.log('insert success')
  }
})

scoreModel.find({name:/cd/},{name:1},(err,docs)=>{
  if (!err) {
    console.log(docs,'?????')
  }else{
    console.log(err)
  }
})