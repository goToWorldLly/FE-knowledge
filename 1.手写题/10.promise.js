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











// class Promise {

//     state = 'pending';
//     value = null;
//     callbacks = [];

//     constructor(fn) {
//         fn(this.resolve.bind(this));
//     }


//     handle({onFulfilled, resolve}) {
//         if(this.state === 'fulfilled') {
//             this.callbacks.push({
//                 onFulfilled,
//                 resolve
//             });
//             return;
//         }

//         if(!onFulfilled) {
//             resolve(this.value);
//             return;
//         }
//         const result = onFulfilled(this.value);
//         resolve(result)
//     }

//     resolve(onFulfilled) {
//         return new Promise(resolve => {
//             this.handle(onFulfilled, resolve)
//         })
//     }

//     resolve(value) {

//         if(
//             value
//             && typeof value === 'object'
//             || typeof value === 'function'
//         ) {
//             const then = value.then;
//             if(typeof then === 'function') {
//                 then.call(value, this.resolve.bind(this))
//             }
//             return;
//         }

//         this.state = 'fulfilled';
//         this.value = value;
//         this.callbacks.forEach(callback => this.handle(callback));
//     }

// }