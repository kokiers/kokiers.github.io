---
title: JS对象递归
lang: js
abbrlink: 3bec5ba6
date: 2019-12-25 16:04:43
categories:
  - js
tags:
  - js
---


最近在弄一个树形结构的数据，
具体问题具体分析，拿到一个树形结构的数据，但是拼接的数据id不是唯一节点。需要自己稍微修改一下数据的属性。

+ 数据的层级不可预见
+ 次跟层级是需要特殊处理
+ 次叶层级特殊处理
+ 叶子的属性num需要冒泡到根节点
+ 拼接唯一节点id

<!--more-->

```javaScript
let handleTree = function(data, prefix) {
  if (!data || !prefix) {
    return
  }
  let Label = keyName[prefix].name
  let appIcon = keyName[prefix].icon
  let arr = [];

  function findleaf(obj, arr, icon, pre) {
    let m = 0
    for (let i in obj) {
      if (pre) {
        // KEY 0 || 1 未 || 删除 这个时候是次叶子节点了。
        let label = i,
          leaf = false,
          iIcon = icon
        if (i == 0 || i == 1) {
          label = i > 0 ? '已' + Label : Label
          leaf = true
        }
        if (!iIcon) {
          iIcon = wordKey[i] ? i : 'default'
          label = wordKey[i] ? wordKey[i] : '其它'
        }
        arr[m] = {
          id: pre + '-' + i,
          label: label,
          num: 0,
          appType: iIcon,
          children: []
        }
        if (leaf) {
          formatLeaf(obj[i], arr[m], i)
        } else {
          findleaf(obj[i], arr[m].children, iIcon, arr[m].id)
        }
      } else {
        // 根节点
        arr[m] = {
          id: i,
          label: i,
          num: 0,
          phone: true,
          children: []
        }
        findleaf(obj[i], arr[m].children, icon, i)
      }
      m++
    }
  }
  findleaf(data, arr, appIcon)
  arr.map(v => {
    v.num = Addnum(v.children)
    return v
  })
  return arr;
}

function Addnum(arr) {
  let nums = 0

  function getNum(arr) {
    let num = 0
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
      if (!arr[i].num) {
        arr[i].num = getNum(arr[i].children)
      }
      num = num + arr[i].num;
    }
    return num;
  }
  nums = getNum(arr)
  return nums
}

function formatLeaf(obj, arr, deleteStatus) {
  let nums = 0;
  if (typeof obj === 'object') {
    for (let i in obj) {
      let key = Object.keys(obj[i])[0]
      let num = Object.values(obj[i])[0]
      arr.children.push({
        id: arr.id + '-' + i,
        label: key,
        gid: i,
        deleteStatus: deleteStatus,
        appType: arr.appType,
        num: num,
      })
      nums = nums + num
    }
    arr.num = nums
  }
}
```
