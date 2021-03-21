__webpack_require__.r(__webpack_exports__);
/* harmony export */ 
__webpack_require__.d(__webpack_exports__,{
    /* harmony export */   
    "a": () => (/* binding */ a),
    /* harmony export */   
    "aa": () => (/* binding */ aa)
    /* harmony export */ 
});
function a() {    console.log('aaa ->')}
function aa() {    console.log('aa')}

//# sourceURL=webpack:///./src/a.js

// import('./b').then(function(value) {
//     console.log(value);
//     value.b();
// }) 


__webpack_require__.r(__webpack_exports__);
/* harmony import */ 
var _a_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a.js */ "./src/a.js");
(0,_a_js__WEBPACK_IMPORTED_MODULE_0__.a)();
console.log('index.js')
//# sourceURL=webpack:///./src/index.js?");



/******/ ([
/***/ (function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ 
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
        let result1 = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* hello */])()
        console.log(result1)
    }),
    (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (immutable) */ __webpack_exports__["a"] = hello;
    /* unused harmony export bye */
    function hello () {
      return 'hello'
    }
    function bye () {
      return 'bye'
    }})
])()
