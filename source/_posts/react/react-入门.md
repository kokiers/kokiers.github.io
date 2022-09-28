---
title: react 入门
lang: react
abbrlink: 2b4f176b
date: 2022-08-22 09:39:02
tags:
---


#### 安装
+ 使用npx 安装
npx create-react-app my-app
+ 安装基于ts的项目
npx create-react-app my-app --template typeScript

 // tips 用npm yarn 都可。
npm init react-app my-app //npm 6+
yarn create react-app my-app //Yarn 0.25+


react 生命周期

componentDidMount 挂载后立即触发
componentDidUpdate 在更新后会被立即调用。首次渲染不会执行此方法。
componentWillUnmount


react 单相数据流

react jsx

react setState 异步，可在回调中处理。
forceUpdate 强制更新（不建议使用）

react 分成函数式组件 （无状态组件）
react 分成类声明式组件 （有状态组件）

react hook
react 高阶组件

react-router
HashRouter,WebRouter

#### Hook 
React 16.8 新增
+ useState
+ useEffect // 浏览器渲染完成后调用
+ useLayoutEffect // dom 变更后，同步触发重渲染。浏览器渲染前，同步更新
+ useContext 
+ useReducer
+ useCallback 
+ useMemo //传给 useMemo 的函数是在渲染期间运行的。 
 // tips useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
  依赖项发生改变才重渲染，如果不提供，则每次都重渲染。（可做性能优化手段）
+ useRef 

无状态函数组件

```bash
const [count, setCount] = useState(0)
# 可以有多个 useState useEffect
useEffect(()=>{
    # dosomething
    # 允许返回一个函数做清除操作。类似在生命周期中的 componentWillUnmount 中需要做的操作。
    return ()=>{
       # clear something 
    }
});

```

Effect 性能优化
+ class 组件中 比较prevProps || prevState 的值与当前state的值
```bash
function componentDidUpdate(prevProps,prevState){
  if (prevState.count != this.state.count) {
    # dosomething
  }
}
```

+ useEffect 无状态组件中 传入第二个参数。 
如果第二个参数是空数组，仅仅会调用一次。
```bash
useEffect(()=>{
 # dosomething
},[count])  //如果count 不改变，里面的函数不调用。
```

自定义Hook
