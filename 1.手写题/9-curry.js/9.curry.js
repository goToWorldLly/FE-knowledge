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