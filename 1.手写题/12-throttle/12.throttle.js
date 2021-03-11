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