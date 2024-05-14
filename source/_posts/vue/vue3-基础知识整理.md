---
title: vue3 基础知识整理
lang: vue
abbrlink: 6d16f794
date: 2022-08-03 20:54:23
tags:
categories:
  - vue
---

### API 风格

Vue 的组件可以按两种不同的风格书写：选项式 API 和组合式 API。

<!--more-->

#### 选项式 (Options api)

个人理解与 vue2 差不多
官方解释： 使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

#### 组合式 (Composition API)

vue3 新写法，推荐！
在单文件组件中，组合式 API 通常会与 `<script setup>`搭配使用

### 生命周期

| vue2 options api | vue3 options api | vue3 composition api        |
| ---------------- | ---------------- | --------------------------- |
| beforeCreate     | beforeCreate     | setup                       |
| created          | created          | setup                       |
| beforeMount      | beforeMount      | onBeforeMount               |
| mounted          | mounted          | onMounted                   |
| beforeUpdate     | beforeUpdate     | onBeforeUpdate              |
| update           | update           | onUpdated                   |
| beforeDestroy    | beforeUnmounted  | onBeforeUnmount             |
| destroyed        | unMounted        | onUnmounted                 |
| --               | ErrorCaptured    | onErrorCaptured             |
| --               | RenderTracked    | onRenderTracked(dev only)   |
| --               | RenderTriggered  | onRenderTriggered(dev only) |

**修改**
`destroyed`  生命周期选项被重命名为  `unmounted`
`beforeDestroy`  生命周期选项被重命名为  `beforeUnmount`

**新增**
`errorCaptured`：在捕获一个来自后代组件的错误时被调用。
`renderTracked`：跟踪虚拟 DOM 重新渲染时调用。
`renderTriggered`：当虚拟 DOM 重新渲染被触发时调用。

> -- update by 2023-5-18

### 创建实例

`createApp`

```javaScript
const app = createApp(App)
app.mount('#app')
```
### 注册
#### 全局注册
我们可以使用 **Vue 应用实例**的 `app.component()` 方法，让组件在当前 Vue 应用中**全局可用**。
`app.component()` 方法可以被链式调用
```js
// 直接注册。
app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)
// 引入文件
import MyComponent from './App.vue'
app.component('MyComponent', MyComponent)
```
#### 局部注册
在使用 <script setup> 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：
```vue
<!-- composition  -->
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

```js
<!-- options  -->
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```
### ref reactive 区别

ref() 推导类型 获取值 .value
reactive() 里面是对象 取值 直接获取
ref 本质也是 reactive，ref(obj)等价于 reactive({value: obj})
ref 只能传入简单值，他的底层是 reactive，所以 reactive 有的，他都有

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

ref() reactive() 区别？
ref() 取值 需要 .value,reactive() 不用
ref() 本质也是 reative()，包装了一个带.value 的对象, .reactive() 只能传入对象， ref 不限制。

### 修饰符
#### v-model 修饰符：
.lazy : 每次在 input 事件后修改，家里 lazy 可以在 change 事件后修改 value
.number: 自动转化成数字。（默认是 string）。 会在 type=number 自动启用。
.trim : 自动去掉左右空格。`<input v-model.trim="msg" />`
#### 事件修饰符
.stop
.prevent
.self
.capture
.once
.passive

```vue
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

### watch 侦听器

#### watch()

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

//组合式 // 提供一个 getter 函数 需要一个箭头函数
// 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器
let state = reactive({count:1,name: '111'})
watch(()=>state.count,(newVal,oldVal)=>{

},{deep: true,})
// immediate :  true  立即执行。因为watch 是惰性的。
```

#### watchEffect()
立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。`返回值`是一个用来停止该副作用的函数。

```javascript
const stop = watchEffect(() => {});
// 当不再需要此侦听器时:
stop();
```

**二者区别：**
+ watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
+ watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

#### 回调触发的时机

是 vue 组件更新前。（dom），如果想要获取更新后的 dom，需要指定`flush: 'post'`

```js
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});

// 或者
import { watchPostEffect } from "vue";

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

#### watch 调试

```js
watch(source, callback, {
  onTrack(e) {
    debugger;
  },
  onTrigger(e) {
    debugger;
  },
});

watchEffect(callback, {
  onTrack(e) {
    debugger;
  },
  onTrigger(e) {
    debugger;
  },
});
```

nexttick

### 组件之间通信
#### provide inject 组件中参数+函数传递

- provide inject

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

reactive():API 有两条限制：

仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。
因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失:
**响应式对象的属性赋值或解构至本地变量时**会失去响应性

用 ref() 定义响应式变量: 使用任何值类型
ref 本质也是 reactive，ref(obj)等价于 reactive({value: obj})

toRef()​：基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
toRefs：当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性：
isRef()​：检查某个值是否为 ref。
unref()​：如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。

isProxy()​
检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。
isReactive()​
检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。
isReactive()​
检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。

shallowRef()​:ref() 的浅层作用形式。
triggerRef()​:强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

customRef()​:创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式

shallowReactive() 只有跟层级有响应式。
shallowReadonly() 只有根层级的属性变为了只读
toRaw() 根据一个 Vue 创建的代理返回其原始对象。
markRaw()​ 将一个对象标记为不可被转为代理。返回该对象本身。

effectScope() 创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理
getCurrentScope()​ 如果有的话，返回当前活跃的 effect 作用域。

### computed 计算属性

默认只读。但是也可以用 get set

```js
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});

// 当fullname 重新赋值后，firstName lastName 同步更新，具有响应式。
```

### vue2 与 vue3 区别

1. 响应式系统的重新配置，使用 proxy 替换 Object.defineProperty
2. typescript 支持
3. 新增组合 API，更好的逻辑重用和代码组织
4. v-if 和 v-for 的优先级
5. 静态元素提升
6. Diff算法优化 虚拟节点静态标记
```js
// patchFlags 字段类型列举
export const enum PatchFlags { 
  TEXT = 1,   // 动态文本内容
  CLASS = 1 << 1,   // 动态类名
  STYLE = 1 << 2,   // 动态样式
  PROPS = 1 << 3,   // 动态属性，不包含类名和样式
  FULL_PROPS = 1 << 4,   // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5,   // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,   // 不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7,   // 带有 key 属性的 fragment 或部分子节点
  UNKEYED_FRAGMENT = 1 << 8,   // 子节点没有 key 的fragment
  NEED_PATCH = 1 << 9,   // 只会进行非 props 的比较
  DYNAMIC_SLOTS = 1 << 10,   // 动态的插槽
  HOISTED = -1,   // 静态节点，diff阶段忽略其子节点
  BAIL = -2   // 代表 diff 应该结束
}
```
7. 生命周期变化
8. 打包体积优化
9. ssr 渲染性能提升
10. 支持多个根节点

从 React Hook 从实现的角度来看，React Hook 是基于 useState 的调用顺序来确定下一个 re 渲染时间状态从哪个 useState 开始，所以有以下几个限制

- 不在循环中、条件、调用嵌套函数 Hook
- 你必须确保它总是在你这边 React Top level 调用函数 Hook
- 使用效果、使用备忘录 依赖关系必须手动确定
  ​
  和 Composition API 是基于 Vue 的响应系统，和 React Hook 相比
  ​
- 在设置函数中，一个组件实例只调用一次设置，而 React Hook 每次重新渲染时，都需要调用 Hook，给 React 带来的 GC 比 Vue 更大的压力，性能也相对 Vue 对我来说也比较慢
- Compositon API 你不必担心调用的顺序，它也可以在循环中、条件、在嵌套函数中使用
- 响应式系统自动实现依赖关系收集，而且组件的性能优化是由 Vue 内部完成的，而 React Hook 的依赖关系需要手动传递，并且依赖关系的顺序必须得到保证，让路 useEffect、useMemo 等等，否则组件性能会因为依赖关系不正确而下降。
  ​
  虽然 Compoliton API 看起来像 React Hook 来使用，但它的设计思路也是 React Hook 的参考。

这里我们会发现 Vue3 对 Vue2 的生命周期钩子似乎没有做大的调整



### props 
原则：单向数据流。需要修改的话抛出事件给父组件修改。
静态传值: `<BlogPost title="my title" />`
动态传值： `v-bind` 或者缩写 `：`:  `<BlogPost :title="post.title" />`
```js
// 使用 <script setup>
const props = defineProps(["foo"]);
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true,
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100,
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: "hello" };
    },
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ["success", "warning", "danger"].includes(value);
    },
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return "Default function";
    },
  },
});

console.log(props.foo);

// 在没有使用 <script setup> 的组件中，
export default {
  props: ["foo"],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo);
  },
};
```



