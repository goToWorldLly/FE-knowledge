class Promise {
    constructor(fn) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) => {
            if(this.state === 'pending') {
                this.value = value;
                this.state = 'fulfilled';
                this.onFulfilledCallbacks.forEach(cb => cb());
            }
        }
        let reject = (reason) => {
            if(this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb());
            }
        }
        try{
            fn(resolve, reject)
        }catch(e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function'
            ? onFulfilled
            : value => value;
        onRejected = typeof onFulfilled === 'function'
            ? onRejected
            : reason => {throw reason};
        let promise2 = new Promise((resolve, reject) => {
            if(this.state === 'fulfilled') {
                setTimeout(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject)
                },0)
            }
            if(this.state === 'rejected') {
                setTimeout(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject)
                },0)
            }

            if(this.state === 'pending') {
                this.onRejectedCallbacks(() => {
                    setTimeout(() => {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    },0)
                });
                this.onFulfilledCallbacks(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                })
            }
        })
        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return new Error('cycle promise')
    }
    if(x == null || !['object', 'function'].includes(typeof x)) {
        resolve(x);
        return;
    }
    try {
        let called = false;
        let then = x.then;
        if(typeof then === 'function') {
            then.call(x, (value) => {
                if(called) return;
                called = true;
                resolvePromise(promise2, value, resolve, reject)
            }, (reason) => {
                if(called) return;
                called = true;
                reject(reason);
            })
        }else {
            if(called) return;
            called = true;
            resolve(x)
        }
    } catch (e) {
        if(called) return;
        called = true;
        reject(e)
    }
}