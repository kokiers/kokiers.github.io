---
title: react 入门
lang: react
abbrlink: 2b4f176b
date: 2021-07-25 21:27:42
categories:
  - react
tags:
 - react
---

#### 安装
+ 使用npx 安装
```bash
npx create-react-app my-app
```
+ 安装基于ts的项目 
```bash
# `npx react-native init yoAnd --template react-native-template-typescript`
npx create-react-app my-app --template typeScript
```
<!-- more -->
 ```bash
# 用npm yarn 都可。
npm init react-app my-app //npm 6+
yarn create react-app my-app //Yarn 0.25+
```

#### react 生命周期 Lifecycle

`componentDidMount` 挂载后立即触发
`componentDidUpdate` 在更新后会被立即调用。首次渲染不会执行此方法。
`componentWillUnmount` 卸载之前触发;相当于 useEffect 里面返回的 cleanup 函数


react 单向数据流

react jsx
react setState 异步，可在回调中处理。
forceUpdate 强制更新（不建议使用）

react 函数式组件 （无状态组件）
react 类声明式组件 （有状态组件）
react 事件处理
```jsx
class Demo extends React.Component{
    constructor(){
        super();
        this.tapFc = this.clickFC.bind(this)
    }

    clickFC(){
      // dosomething
    }

    render=()=>{
        return (
            <div>
               <input type="button" value="button" onClick={this.tapFc}/>
              {
                //1. <input type="button" value="button" onClick={()=>this.clickFC}/>
                //2. <input type="button" value="button" onClick={this.clickFC.bind(this)}/>
              }
            </div>
        )
    }
}

```

#### Hook 
**React 16.8** 新增

> 在 `react` 官方文档里，对 `hooks` 的定义和使用提出了 **“一个假设、两个只在”** 核心指导思想。
> 一个假设： 假设任何以 「use」 开头并紧跟着一个大写字母的函数就是一个 Hook。
> 第一个只在： 只在 React 函数组件中调用 Hook，而不在普通函数中调用 Hook。（Eslint 通过判断一个方法是不是大坨峰命名来判断它是否是 React 函数）
> 第二个只在： 只在最顶层使用 Hook，而不要在循环，条件或嵌套函数中调用 Hook。

转自[摸鱼的春哥](https://juejin.cn/post/7066951709678895141)
+ `useState`
+ `useEffect` // 浏览器渲染完成后调用
+ `useLayoutEffect` // dom 变更后，同步触发重渲染。浏览器渲染前，同步更新
+ `useContext` 
+ `useReducer`
+ `useCallback` 会在渲染期间执行，返回一个函数，useCallback是用来帮忙缓存函数的，当依赖项没有发生变化时，返回缓存的指针，当在依赖项变化的时候会更新，返回一个新的函数
+ `useMemo` //传给 useMemo 的函数是在渲染期间运行的。 会在在组件首次加载和重渲染期间执行
 // tips useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
  依赖项发生改变才重渲染，如果不提供，则每次都重渲染。（可做性能优化手段）
+ `useRef` 


无状态函数组件

```javaScript
const [count, setCount] = useState(0)
# 可以有多个 useState useEffect
useEffect(()=>{
    // # dosomething
    // # 允许返回一个函数做清除操作。类似在生命周期中的 componentWillUnmount 中需要做的操作。
    return ()=>{
      //  # clear something 
    }
});

```

Effect 性能优化
+ class 组件中 比较prevProps || prevState 的值与当前state的值
```javaScript
function componentDidUpdate(prevProps,prevState){
  if (prevState.count != this.state.count) {
    // # dosomething
  }
}
```

+ useEffect 无状态组件中 传入第二个参数。 
如果第二个参数是空数组，仅仅会调用一次。
```javaScript
useEffect(()=>{
//  # dosomething
},[count])  //如果count 不改变，里面的函数不调用。
```


#### react之传递数据

组件间通信方式总结
+ 父组件 => 子组件：
>Props
>Instance Methods
+ 子组件 => 父组件：
>Callback Functions
>Event Bubbling
+ 兄弟组件之间：
>Parent Component
+ 不太相关的组件之间：
>Context
>Portals
>Global Variables
>Observer Pattern
>Redux等













