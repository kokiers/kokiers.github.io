---
title: promise
lang: js
abbrlink: 9b0c2390
date: 2023-04-03 21:43:26
categories:
  - js
tags:
 - js
---

Promise 是异步编程解决方案，Promise对象有2个特点，
+ 1.对象的状态不受外部影响。有三种状态，pending fulfilled rejected
+ 2.状态一旦改变，就不会再变。 比如 pending -> fulfilled ||  pending -> rejected
<!-- more -->
`Promise.all`
全部fulfilled -> then,
有一个rejected 就会catch。不会等待后面执行
```javaScript
const resolved = Promise.resolve(42);
const rejected = Promise.resolve(-1);
const rejected1 = Promise.reject(88);
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 2000)//不执行
})
Promise.all([resolved, rejected,rejected1,p1]).then((res)=>{
    console.log(res)
}).catch(e=>{
    console.log(e)
});
```

`Promise.allSettled`
```javaScript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const rejected1 = Promise.reject(88);

const allSettledPromise = Promise.allSettled([resolved, rejected,rejected1]);

allSettledPromise.then(function (results) {
  console.log(results);
});
```

`Promise.any()`
```javaScript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const rejected1 = Promise.reject(88);
Promise.any([
  resolved,rejected,rejected1
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```

`Promise.race`
```javaScript
// 只要任意一个promise状态改变就会返回状态给p
const p = Promise.race([p1, p2, p3]);

const p = Promise.race([
  new Promise((resolve, reject)=>{
    setTimeout(() => resolve(500), 500)
    
  }),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

手动完成一个promise

```javaScript
// 原型
var MpPrototype = {};
// 状态
const state = {};
// 属性描述符对象
function createPropDes( value, writable = false, enumerable = true, configurable = false ) {
  return {
    value:        value,
    writable:     writable,
    enumerable:   enumerable,
    configurable: configurable
  }
}
Object.defineProperties( state, {
  Pending:  createPropDes( 'Pending' ),
  Resolved: createPropDes( 'Resolved' ),
  Rejected: createPropDes( 'Rejected' )
} )
Object.defineProperties( MpPrototype, {
  state: createPropDes( state ),
  res: createPropDes( function( val ) {
    // console.log('res', this)
    let fn = () => {
      // console.log('fn', this)
      if ( !this.isPending() ) {  // 仅在Pending状态下可改变状态
        return;
      }
      let { _resQue, _rejQue, isFunction, state } = this;
      let that = this;

      let runSucFn = ( val ) => {
        let mp;
        while ( _resQue.length ) {  // mp 是then投进来的函数
          mp = _resQue.shift();
          mp( val );
        }
      }
      let runFailFn = ( err ) => {
        let mp;
        while ( _rejQue.length ) {  // mp 是then投进来的函数
          mp = _rejQue.shift();
          mp( err );
        }
      }
      if ( val instanceof MP ) {
        val.then( val => {
          that._state = state.Resolved;
          that._val = val;
          runSucFn( val );
        }, err => {
          that._state = state.Rejected;
          that._val = err;
          runFailFn( val );
        } )
      }
      else {
        that._state = state.Resolved;
        that._val = val;
        runSucFn( val );
      }
    }
    setTimeout(() => {
      fn();
    }, 0);
  } ),
  rej: createPropDes( function( err ) {
    let fn = () => {
      if ( !this.isPending() ) {
        return;
      }
      let { _resQue, _rejQue, isFunction, state } = this;
      let that = this;
      let mp;
      while ( _rejQue.length ) {  // mp 是then投进来的函数
        mp = _rejQue.shift();
        mp( err );
      }
      this._state = state.Rejected;
      this._val = err;
    }
    setTimeout(() => {
      fn();
    }, 0);
  } ),
  then: createPropDes( function( onResolved, onRejected ) {
    const { _state, _val, _resQue, _rejQue, isFunction } = this;
    var that = this;
    let res = new MP( function ( onNextResolved, onNextRejected ) {
      let sucFn = function( _val ) {
        let resResult;
        if ( isFunction( onResolved ) ) {
          console.log('_val', _val)
          resResult = onResolved( _val );
          if ( resResult instanceof MP ) {
            resResult.then( onNextResolved, onNextRejected );
          }
          else {
            onNextResolved( resResult );
          }
        }
        else {
          onNextResolved( _val );
        }
      }
      let failFn = function( _val ) {
        let rejResule;
        if ( isFunction( onRejected ) ) {
          rejResult = onRejected( _val );
          if ( rejResult instanceof MP ) {
            rejResult.then( onNextResolved, onNextRejected );
          }
          else {
            onNextRejected( rejResult );
          }
        }
        else {
          onNextRejected( _val );
        }
      }
      switch ( _state ) {
        case state.Resolved:
          try{
            sucFn(); 
          }
          catch( err ) {
            onNextRejected( err );
          }
          break;
        case state.Rejected:
          try{
            failFn();
          }
          catch( err ) {
            onNextRejected( err );
          }
          break;
        case state.Pending: 
          that._resQue.push( sucFn );
          that._rejQue.push( failFn );
          break;
      }
    } );
    return res;
  } ),
  catch: createPropDes( function( onRejected ) {
    return this.then( undefined, onRejected );
  } ),

  // 静态方法
  resolve: createPropDes( function( val ) { 
    if ( val instanceof MP ) return val;
    return new Promise( function( res, rej ) {
      res( val );
    } );
  } ),
  reject: createPropDes( function( err ) {
    if ( err instanceof MP ) return err;
    return new Promise( function( res, rej ) {
      rej( err );
    } )
  } ),
  all: createPropDes( function( MPList ) {
  return new Promise( function( res, rej ) {
    let result = [];
    let count = 0;
    for ( let [ index, item ] of MPList ) {
      item.then( val => {
        result[ index ] = val;
        count++;
        if ( count === MPList.length ) {
          res( result );
        }
      }, err => {
        rej( err );
      } );
    }
  } )
  } ),
  race: createPropDes( function( MPList ) {
    return new Promise( function ( res, rej ) { 
      for ( let [ index, item ] of MPList ) {
        item.then( val => {
          res( val );
        }, err => {
          rej( err );
        } )
      }
     } )
  } ),
  finally: createPropDes( function( mp ) {
    return this.then( 
      val => MP.resolve( mp() ),
      err => MP.reject( mp() )
     );
  } ),

  // 辅助的判断函数
  isFunction: createPropDes( function( fn ) {
    return typeof fn === 'function' && typeof fn.nodeType != 'number';
  } ),
  isResolved: createPropDes( function() {
    return this._state === state.isResolved;
  } ),
  isRejected: createPropDes( function() {
    return this._state === state.Rejected;
  } ),
  isPending: createPropDes( function() {
    return this._state === state.Pending;
  } )

});

function MP( handle ) {
  this._state = state.Pending;
  this._val = undefined;
  this._resQue = [];
  this._rejQue = [];

  if ( !this.isFunction( handle ) ) {
    throw new Error("Error: 只接收函数");
  }
  else {
    handle( this.res.bind(this), this.rej.bind(this) );
  }
} 

MP.prototype = MpPrototype;

let a = new MP( ( res, rej ) => {
  rej(1)
} )

```