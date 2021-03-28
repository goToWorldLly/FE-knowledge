## new

```js
function New(func, args) {
    let obj = {};
    if(func.prototype !== null) {
        obj.__proto__ = func.prototype;
    }
    let res = func.apply(obj, args);
    if(res !== null && ['object', 'function'].includes(res)) {
        return res;
    }
    return obj;
}
```



## Object.create

```js
function create(o) {
  function T() {};
  T.prototype = o;
  return new T();
}
```

## instanceof

```js
function Instanceof(left, right) {
    let leftProto = left.__proto__,
        rightProto = right.prototype;
    
    while(true) {
        if(leftProto === null) {
            return false;
        }   
        if(leftProto === rightProto) {
            return true;
        }   
        leftProto = leftProto.__proto__;
    }
}
```



## deepClone

```js
function isPrimitive(value) {
  return ['string','number','boolean','symbol'].includes(typeof value);
}

function isObject(val) {
  	return Object.prototype.toString.call(val) === '[object Object]';
}

function deepClone(value) {
  	let mome = {};
  	function inner(value) {
      	let res;
      	if(isPrimitive(value)){
           	return value;
        }else if(Array.isArray(value)) {
             res = [...value]
        }else if(isObject(value)) {
             res = {...value}    
        }
      
      	Reflect.ownKeys(res).forEach(key => {
          	const val = res[key];
          	if(typeof  val=== 'object' && val !== null) {
              	//此处我们用memo来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
               	if(mome[val]) {
                   	res[key] = mome[val]
                }
                else{
                    mome[val] = val;
                  	res[key] = inner(val)
                }
            }
        })
      	
      	return res;
    }
  
  	return inner(value)
}

补充知识：
Object.keys() 仅仅返回自身的可枚举属性，不包括继承来的，更不包括Symbol属性
Object.getOwnPropertyNames() 返回自身的可枚举和不可枚举属性。但是不包括Symbol属性
Object.getOwnPropertySymbols() 返回自身的Symol属性
for...in 可以遍历对象的自身的和继承的可枚举属性，不包含Symbol属性
Reflect.ownkeys() 返回对象自身的所有属性，不管是否可枚举，也不管是否是Symbol。注意不包括继承的属性
```

## JSON.stringify

```js
function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}
```



## JSON.parse

