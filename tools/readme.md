> 工具函数

解析url

正则 驼峰转换

千分位

```js
function qianfen(num) {
  	return String(num).replace(/\d+/, function(data) {
      	return data.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
          	return $1+','
         })
    })
}
```

