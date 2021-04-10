Function.prototype.call2 = function(context, ...args) {
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

Function.prototype.bind = function(context, ...args) {
    const fn = this;
    function Temp() {};
    function inner(...innerArgs) {
        const _context = this instanceof fn ? this : context;
        fn.apply(_context, innerArgs);
    }
    Temp.prototype = fn.prototype;
    inner.prototype = new Temp();
    return inner;
}


function _new(constructor, ...args) {
    const obj = {};
    if(constructor.prototype) {
        obj.__proto__ = constructor.prototype;
    }
    const res = constructor.apply(obj, args);
    return typeof res === 'object' ? res : obj;
}

function instanceof_(obj, cons) {
    const proto = obj.__proto__;
    const target = cons.prototype;

    while(true) {
        if(proto === null) {
            return false
        }
        if(proto === target) {
            return true;
        }
        proto = proto.__proto__;
    }
}

function create(o) {
    function Temp() {}
    Temp.prototype = o;
    return new Temp();
}


function stringify(json) {
    if(json === null) {
        return String(null);
    }

    switch(typeof json) {
        case 'boolean':
        case 'number':
            return String(json);
        case 'string':
            return '"'+json+'"';
        case 'function':
        case 'undefined':
            return undefined
    }

    const type = Object.prototype.toString.call(json).slice(8, -1);

    switch(type) {
        case 'Date':
            return '"'+ (json.toJSON ? json.toJSON() : json.toString()) + '"';
        case 'RegExp':
            return '{}'
        case 'Array':
            const res = '[';
            for(let i = 0; i < json.length; i++) {
                const curr = stringify(json[i]);
                res += curr === undefined ? null : curr + ','
            }
            if(res !== '[') {
                res = res.slice(0, -1)
            }
            res += ']';
            return res;
        case 'Object':
            const res = '{';
            for(let key in json) {
                if(!json.hasOwnPrototype(key)) {
                    continue;
                }
                const val = stringify(json[key]);
                if(val !== undefined) {
                    res+= '"'+key+'":'+val +','
                }
                if(res !== '{') {
                    res = res.slice(0, -1)
                }
                res += '}';
            }
    }
}

function parse(string) {
    return eval('('+string+')')
}

function deepClone(data, memo = new WeekMap()) {
    if(typeof data !== 'object' || data === null) {
        return data
    }

    let res = Array.isArray(data) ? [] : {};

    if(memo.get(data)) {
        return memo.get(data);
    }
    memo.set(data, res);

    for(let key in data) {
        res[key] = deepClone(data[key], memo)
    }

    return res;
}


function curry(fn, ...args) {
    const length = fn.length;
    const argsArr = args;
    const that = this;
    return function(...rest) {
        argsArr = argsArr.concat(rest);
        if(argsArr.length >= length) {
            return fn.apply(that, argsArr)
        }
        return curr.call(that, fn, argsArr)
    }
}

function debounce(fn, delay) {
    const timer = null;
    return function (...args) {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function throttle(fn, delay) {
    const timer = null;
    return function (...args) {
        if(timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            clearTimeout(timer)
        }, delay)
    }
}

function deepClone(data, memo = new WeekMap()) {
    if(typeof data !== 'object') {
        return data;
    }
    if(memo.get(data)) {
        return memo.get(data)
    }
    const clone = Array.isArray(data) ? [] : {};
    memo.set(data, clone);

    for (const key in object) {
        clone[key] = deepClone(data[key])
    }
    return clone;
}


class Promise {
    constructor(fn) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if(this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(cb => cb());
            }
        }

        let reject = reason => {
            if(this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb())
            }
        }

        try{
            fn(resolve, reject);
        }catch(error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if(this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
            }
            if(this.state === 'rejected') {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            }

            if(this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });
    
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        });
        return promise2;
    }
    
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return new Error('cycle promise');
    }
    if(x == null || !['object', 'function'].includes(x)) {
        resolve(x);
        return;
    }

    try {
        let called;
        // x 是 then回调的返回结果
        // 如果存在.then 则说明返回的也是一个Promise
        let then = x.then;
        if(typeof then === 'function') {
            then.call(x, (value) => {
                // 失败和成功呢的回调只能调用一个
                console.log('------->', value)
                if(called) {
                    return;
                }
                called = true;
                resolvePromise(promise2, value, resolve, reject)
            }, (error) => {
                if(called) {
                    return;
                }
                called = true;
                reject(error);
            })
        }else {
            resolve(x)
        }
    } catch (error) {
        if(called) {
            return;
        }
        called = false;
        reject(error);
    }
}   


function bar() {
    return new Promise((resolve) => {
        resolve('promise1')
    })
}

function bar2() {
    return new Promise((resolve) => {
        resolve('promise2')
    })
}

bar().then(() => {
    return bar2(2)
}).then(res => {
    console.log(res)
})