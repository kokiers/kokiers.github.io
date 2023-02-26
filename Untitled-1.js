class myObj {

}


路由守卫

强缓存  协商缓存

watch  vue3 区别

双向数据绑定

手写一个双向数据绑定 

为什么vue 不能在 ie8一下

vue2 vue3 区别

nexttick ??

Proxy

ref reactive 区别

域名到页面渲染发生什么？

路由方式有？

hash路由 

组件通信？？



Proxy

var obj = {
    a: 1
}

let pro = new Proxy(obj,{
    get(target,key,receiver){
        console.log(receiver[key])
        return target[key]
    },
    set(target,key,value,receiver){
        target[key] = value + 1;
    }
})



ie9以上支持。所以vue 不支持ie8以下的ie浏览器。
Object.defineProperty 
描述符默认值汇总
拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
属性值和函数的键 value、get 和 set 字段的默认值为 undefined。


var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});