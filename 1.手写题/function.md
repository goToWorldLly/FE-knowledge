

## call

```js

Function.prototype.call = function(context = window, ...args) {
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

Function.prototype._call = function(context) {
    var len = arguments.length;
    context = context ? Object(context) : window;
    var args = [];
    for(var i = 1; i < len; i++) {
        args.push("arguments[" + i + "]");
    }
    context.fn = this;
    eval("context.fn("+ args +")");
    delete context.fn;
}

```



## apply

```js
Function.prototype.apply = function(context = window, ...args) {
    context.fn = this;
    const res = context.fn(args);
    delete context.fn;
    return res;
}
```



## bind

```js
Function.prototype.bind = function(context = window, ...args) {
    const fn = this;
    function Temp() {};
    function inner(...innerArgs) {
        const _context = this instanceof fn ? this : context
        that.apply(_context, args.concat(innerArgs))
    }
    Temp.prototype = fn.prototype;
    inner.prototype = new Temp();
    return inner;
}
```



## debounce

```js
function debounce(fn, delay) {
    let timer = null;
    return function() {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, [...arguments])
        }, delay)
    }
}
```



## throllte

```js
function throttle(fn, delay) {
    let flag = true;
    return function(...args) {
        if(!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay)
    }
}
```

## curry

```js
function curry1(fn, ...args) {
    var that = this;
    return function(...innerArgs) {
        return fn.apply(that, args.concat(innerArgs))
    }
}
function curry(fn, ...args) {
    let that = this,
        length = fn.length,
        argArr = args || [];
    return function(...innerArgs) {
        argArr.push(innerArgs);
        if(argArr.length >= length) {
            return fn.apply(that, argArr)
        }
        return curry.call(that, fn, argArr);
    }
}
```

