

function deepClone(origin, memo = new WeakMap()) {
    if(typeof origin !== 'object') {
        return origin
    }
    if(memo.get(origin)) {
        return memo.get(origin)
    }
    const cloneOrigin = Array.isArray(origin) ? [] : {};
    memo.set(origin, cloneOrigin);
    for(key in origin) {
        cloneOrigin[key] = deepClone(origin[key], memo)
    }
    return cloneOrigin;
}

function stringify(json) {
    if(json === null) {
        return String(null)
    }

    switch(typeof json) {
        case 'boolean':
        case 'number':
            return String(json)
        case 'string':
            return '"'+json+'"'
        case 'function':
        case 'undefined':
            return undefined
    }

    const type = Object.prototype.toString.call(json).slice(8, -1);

    switch(type) {
        case 'Date':
            return '"' + (json.toJSON ? json.toJSON() : json.toString()) + '"';
        case 'RegExp': 
            return '{}'
        case 'Array':
            const result = '[';
            for(let i = 0; i < json.length; i++) {
                const currVal = stringify(json[i]);
                result+= currVal === undefined ? null : currVal + ',';
            }
            if(result !== '[') {
                result = result.slice(0, -1)
            }
            result+= ']'
            return result;
        case 'Object':
            const result = '{';
            for(key in json) {
                if(json.hasOwnProperty(key)) {
                    const currVal = stringify(json[key]);
                    if(currVal !== undefined) {
                        result+= '"'+key+'":' + currVal + ',';
                    }
                }
            }
            if(result !== '{') {
                result = result.slice(0, -1)
            }
            result+= '}'
            return result;
    }
}

