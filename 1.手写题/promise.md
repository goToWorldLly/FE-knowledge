## promise

```js
/**
 * Promise
 */
const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class Promise {

    state = STATUS.PENDING;
    callbacks = [];
    value = null;

    constructor(fn) {
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            this.handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve,
                reject
            })
        })
    }

    catch(onError) {
        return this.then(null, onError)
    }

    finally(onDone) {
        return this.then(onDone, onDone)
    }

    resolve(value) {
        if(
            value
            && typeof value === 'object'
            || typeof value === 'function'
        ) {
            const then = value.then;
            if(typeof then === 'function') {
                then.call(
                    value, 
                    this.resolve.bind(this),
                    this.reject.bind(this)
                )
            }
        }

        this.state = STATE.FULFILLED;
        this.value = value;
        this.callbacks.forEach(callback => this.handle(callback))
    }

    reject(error) {
        this.state = STATE.REJECTED;
        this.value = error;
        this.callbacks.forEach(callback => this.handle(callback))
    }

    handle(callback) {
        if(this.state === State.PENDING) {
            this.callbacks.push(callback);
        }
        const isFulfilled = this.state === STATE.FULFILLED;
        const {onFulfilled, onRejected, resolve, reject} = callback;
        let cb = isFulfilled ? onFulfilled : onRejected;
        if(!cb) {
            cb = isFulfilled ? resolve : reject;
            cb(this.value);
        }
        let result = cb(this.value);
        cb = isFulfilled ? resolve : reject;
        cb(result);
    }

}
```

