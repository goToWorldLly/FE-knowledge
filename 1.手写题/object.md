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
https://segmentfault.com/a/1190000020255831

```js

function deepClone(data, map = new WeekMap()) {
  	if(typeof data !== 'object') {
          return data
    }
    let cloneTarget = Array.isArray(data) ? [] : {}
    if(map.get(data)) {
        return map.get(data);
    }
    map.set(data, cloneTarget);
    for(key in data) {
        cloneTarget[key] = deepClone(data[key], map)
    }
    return cloneTarget;
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


function stringify(value) {
    let result = '',
        curVal = '';

    if(value === null) {
        return String(value);
    }

    switch(typeof value) {
        case 'number':
        case 'boolean':
            return String(value);
        case 'string':
            return '"'+value+'"';
        case 'undefined':
        case 'function':
            return undefined;
    }

    const type = Object.prototype.toString.call(value);

    switch(type) {
        case '[object Array]':
            result += '[';
            for(var i = 0, len = value.length; i < len; i++){
                curVal = stringify(value[i]);
                result += (curVal === undefined ? null : curVal) + ',';
            }
            if(result !== '[') {
                result = result.slice(0, -1);
            }
            result += ']';
            return result;
        case '[object Date]':
            return `"${value.toJSON ? value.toJSON() : value.toString()}"`;
        case '[object RegExp]':
            return "{}";
        case '[object Object]':
            result += '{';
            for(key in value) {
                if(!value.hasOwnProperty(key)) continue;
                curVal = stringify(value[key]);
                if(curVal !== undefined) {
                    result += `"${key}":${value[key]},`
                }
            }
            if(result !== '') {
                result = result.slice(0, -1);
            }
            return result;
    }
    
}

/**
 * 参考 https://www.jianshu.com/p/f1c8bcd16f71
 */
```



## JSON.parse

```js
function parse(string) {
	return eval('('+string+')')
}
```

