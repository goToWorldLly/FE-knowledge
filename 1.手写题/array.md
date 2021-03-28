## map

## reduce

```js
Array.prototype._reduce = (callback, initialValue) => {
    let arr = this;
    let base = typeof initialValue == 'undefined' ? arr[0] : initialValue;
    let startPoint = typeof initialValue === 'undefined' ? 1 : 0;
    arr.slice(startPoint).forEach((val, index) => {
        base = callback(base, val, index + startPoint, arr)
    })
    return base
}
```



## filter

```js
var arr = [1,2,3,4,5,6];

var arr1 = [4,5,6,7,8,9];

var resArr = arr.filter(arrItem => {
    return !arr1.find(arr1Item =>  (arr1Item === arrItem))
})

console.log(resArr) // [ 1, 2, 3 ]
```



## flat

## unique

```JS
//
function uniquee1(){
     var hash = {};
      var resArr = oldArr.reduce(function(acc, curr) {
        hash[curr.id] ? "" : (hash[curr.id] = true && acc.push(curr));
        return acc;
	  }, []);
	  
	  return resArr;
	  console.log('-=-=-=-=-=-=-=',oldArr)
}
//reduce版本
function uniqueArr(){
    return oldArr.reduce((acc,curr) => {
      	if(!acc.hash[curr.id]){
      		return {
      			hash: {...curr.hash, [curr.id]: true},
      			result: [...acc.result,curr]
      		}
      	}else{
      		return acc;
      	}
    },{result: [],hash: {}}).result
}

//递归的做法


const objArr = [{id:1}, {id:2},{id:1}, {id:3}];

function uniqueWith(fn, arr) {
    return (function _uniqueWith(_arr, _fn, _result = []) {
        if (_arr.length === 0) {
            return _result;
        }
        _fn = _fn || ((x, y) => x === y);
        const [cur, ...rest] = _arr;
        const newResult = _result.find(item => fn(cur, item))
            ? _result
            : [..._result, cur];
        return _uniqueWith(rest, _fn, newResult)
    })(arr, fn)
}
console.log(uniqueWith((x, y) => x.id === y.id, objArr))
      
```



## sort

