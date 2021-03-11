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