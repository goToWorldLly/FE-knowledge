function clone_d(obj) {
    let result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if(value && typeof value === 'object') {
                result[key] = clone_d(value);
            }else {
                result[key] = value;
            }
            
        }
    }

    return result;
}

const bar = {
    a: 123,
    b: [3, 4],
    c: function() {},
    d: undefined,
    e: null,
    f: {
        h: 13,
        a: function() {}
    }
}

console.log(bar)

const foo = clone_d(bar);

console.log(foo)
