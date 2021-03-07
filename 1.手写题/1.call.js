/**
 * call 
 */


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

