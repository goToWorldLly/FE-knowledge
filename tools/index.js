/**
 * 判断数据类型
 * @param {*} value 
 * @returns 
 */
function checkType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}   
