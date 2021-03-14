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
                if(!value.hasOwnProperty(key)) return;
                curVal = stringify(value[key]);
                if(curVal !== undefined) {
                    result += `"${key}":${value[key]}`
                }
            }
            if(result !== '[') {
                result = result.slice(0, -1);
            }
            return result;
    }
    
}

/**
 * 参考 https://www.jianshu.com/p/f1c8bcd16f71
 */