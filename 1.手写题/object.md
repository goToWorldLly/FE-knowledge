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
function clone(val) {
  	if(val === null || typeof val !== 'object') {
       	return val
    }
  	
  	for(let key in val) {
      	if(val.hasOwnproperty(key)) {
         
      	}
    }
}
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

