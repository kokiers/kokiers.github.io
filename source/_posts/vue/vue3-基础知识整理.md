---
title: vue3 基础知识整理
lang: vue
abbrlink: 6d16f794
date: 2022-08-03 20:54:23
tags:
categories:
  - vue
---


### API 风格：

Vue 的组件可以按两种不同的风格书写：选项式 API 和组合式 API。
<!--more-->
```javaScript


```

#### 选项式 (Options api)
个人理解与vue2差不多
官方解释： 使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。




```javascript
```



#### 组合式 (Composition API)
vue3 新写法，推荐！ 
在单文件组件中，组合式 API 通常会与 `<script setup>`搭配使用

### 创建实例
`createApp`

```javaScript
const app = createApp(App)
app.mount('#app')
```

### ref reactive 区别

ref() 推导类型   获取值 .value
reactive() 里面是对象  取值 直接获取
ref本质也是reactive，ref(obj)等价于reactive({value: obj})
ref只能传入简单值，他的底层是reactive，所以reactive有的，他都有

```javaScript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

 #### 事件修饰符
.stop
.prevent
.self
.capture
.once
.passive

```jsx
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```

### watch

```javaScript
//选项式写法：
 watch:{
    name:function(newVal,oldVal){
        //dosomething
    },
    age:{
        handler:function(){

        },
        deep: true,
        immediate: true// 立即执行
        flush: 'post'//handler 中处理vue更新之后得dom 
    }
 }
//组合式
let state = reactive({count:1,name: '111'})
watch(()=>state.count,(newVal,oldVal)=>{
    
})

watchEffect(()=>{
    console.log(state.count,state.name)
})
 ```


 nexttick

#### 组件中参数+函数传递
+ provide inject
```javaScript
// parent
import { provide,ref } from 'vue';

let myName = ref('haibing')
let changeName = (v:string)=>{
  myName.value = v
}
provide('myName',myName)
provide('changeName',changeName)
```
```javaScript
// child or grandson
   import {inject} from 'vue'
  
  let aName = inject('myName')
  // 调用函数的例子 2种做法。
  let setName = inject('changeName') as Function 
  let setNameT = inject('changeName',Function,true)
```