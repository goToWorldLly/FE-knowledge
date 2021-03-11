Function.prototype.apply = function(context = window, ...args) {
    context.fn = this;
    const res = context.fn(args);
    delete context.fn;
    return res;
}