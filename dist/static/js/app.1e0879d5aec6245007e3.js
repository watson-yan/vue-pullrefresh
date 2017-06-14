webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(6)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(9),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_pullRefresh__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_pullRefresh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_pullRefresh__);
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  data() {
    return {
      list: [{ title: '什么是伪类？作为JavaScript程序员的你知道吗?' }, { title: 'JavaScript实现简单的双向数据绑定（Ember、Angular、Vue）' }, { title: 'WebView性能、体验分析与优化' }, { title: '模块化JavaScript组件开发指南' }, { title: '前端高手教你高效管理数据：将JSON API和Redux结合使用' }, { title: '前端每周清单第 17 期：大前端技术生命周期模型；WWDC 发布 Safari 11；面向生产环境的前端性能优化' }, { title: '前端不为人知的一面——前端冷知识集锦' }, { title: 'Web前端开发工程师需要掌握哪些核心技能？' }, { title: '探讨后端选型中不同语言及对应的Web框架' }, { title: '有一本书，适合零到十年经验的程序员看' }, { title: 'JavaScript 的装饰器：它们是什么及如何使用' }, { title: '移动端一个像素问题解决方案' }],
      backup: [{ title: 'Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果' }, { title: '混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项' }, { title: '由于多个状态分散的跨越在许多组件和交互间各个角落，大型应用复杂度也经常逐渐增长。为了解决这个问题，Vue 提供 vuex' }, { title: 'Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。' }, { title: '除了默认设置的核心指令( v-model 和 v-show ),Vue 也允许注册自定义指令。' }, { title: '混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项。' }, { title: 'Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据' }, { title: '模板内的表达式是非常便利的，但是它们实际上只用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护' }, { title: '许多事件处理的逻辑都很复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的' }, { title: 'Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新' }]
    };
  },
  methods: {
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const appendList = [];
          const temp = {};
          while (appendList.length < 3) {
            const index = Math.floor(Math.random() * 10);
            if (!temp[`attr${index}`]) {
              temp[`attr${index}`] = this.backup[index];
              appendList.push(this.backup[index]);
            }
          }
          for (let i = 0; i < appendList.length; i++) {
            this.list.unshift(appendList[i]);
          }
          resolve();
        }, 2000);
      });
    }
  },
  components: {
    pullRefresh: __WEBPACK_IMPORTED_MODULE_0__components_pullRefresh___default.a
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    next: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      msg: '',
      flag: 0, // 表示是否达到刷新条件
      loading: 0, // 表示是否正在刷新中
      touchStart: 0, // 手指触摸屏幕的起点
      distance: 0 // 手指滑动的距离
    };
  },
  mounted() {
    const container = this.$refs.container;
    container.addEventListener('touchstart', e => {
      if (this.loading) {
        e.preventDefault();
        return;
      }
      // 取第一个手指的触摸点作为起始点
      this.touchStart = e.targetTouches[0].clientY;
    });
    container.addEventListener('touchmove', e => {
      // 如果没有触摸起始点，返回
      if (!this.touchStart) {
        return;
      }
      if (this.loading) {
        e.preventDefault();
        return;
      }

      const touch = e.targetTouches[0];
      const scrollTop = container.scrollTop;
      if (scrollTop === 0) {
        this.distance = touch.clientY - this.touchStart;
        if (this.distance > 0) {
          e.preventDefault();
          if (this.distance < 80) {
            container.style.overflow = 'inherit';
            container.style.transform = 'translate3D(0px, ' + this.distance + 'px, 0px)';
            if (this.distance > 55) {
              this.msg = '释放刷新';
              this.flag = 1;
            } else {
              this.msg = '下拉刷新';
            }
          }
        }
      }
    });
    container.addEventListener('touchend', e => {
      if (this.distance === 0) {
        return;
      }
      if (this.loading) {
        e.preventDefault();
        return;
      }

      if (this.flag && this.distance > 0) {
        container.style.transform = 'translate3D(0px, 50px, 0px)';
        this.loading = 1;
        this.next().then(() => {
          this.flag = 0;
          this.loading = 0;
          container.scrollTop = 0;
          container.style.overflow = 'auto';
          container.style.transform = 'translate3D(0px, 0px, 0px)';
        });
        return;
      }
      this.flag = 0;
      container.style.overflow = 'auto';
      container.style.transform = 'translate3D(0px, 0px, 0px)';
    });
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(7)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(10),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('pull-refresh', {
    attrs: {
      "next": _vm.refresh
    }
  }, [_c('div', {
    slot: "list"
  }, _vm._l((_vm.list), function(item) {
    return _c('section', {
      staticClass: "list-item"
    }, [_vm._v("\n        " + _vm._s(item.title) + "\n      ")])
  }))])], 1)
},staticRenderFns: []}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "container",
    staticClass: "vue-pull-refresh"
  }, [_c('div', {
    staticClass: "vue-pull-refresh-msg"
  }, [(_vm.loading) ? [_c('svg', {
    staticClass: "vue-pull-refresh-loading",
    staticStyle: {
      "width": "1.2em",
      "height": "1.2em",
      "vertical-align": "middle",
      "fill": "currentColor",
      "overflow": "hidden"
    },
    attrs: {
      "t": "1497367491334",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "1977"
    }
  }, [_c('path', {
    attrs: {
      "d": "M486.75754 135.400013 402.25163 59.310554C388.509379 46.936957 387.96346 25.139993 400.208308 11.540621 412.822131-2.468343 433.957671-4.001381 447.930113 8.579401L601.089596 146.484825C605.090636 150.087331 607.97301 154.488612 609.74682 159.253816 614.767405 170.908986 613.043155 184.73657 603.956951 194.827778L466.051527 347.987261C453.677999 361.729512 431.880966 362.275431 418.281663 350.030583 404.27263 337.416761 402.739592 316.281152 415.320374 302.308778L504.712387 203.028852C300.714847 206.912339 136.539841 373.49343 136.539841 578.419721 136.539841 785.780633 304.639089 953.87988 512 953.87988 720.609624 953.87988 887.460159 790.22062 887.460159 584.090467 887.460159 517.424512 870.092464 453.371077 837.556793 396.914498 828.144212 380.58164 833.754269 359.710766 850.087128 350.298184 866.420054 340.885671 887.29086 346.49566 896.703442 362.828587 935.174114 429.583765 955.725642 505.37934 955.725642 584.090467 955.725642 828.220806 758.019723 1022.145363 512 1022.145363 266.937086 1022.145363 68.274358 823.482635 68.274358 578.419721 68.274358 341.828486 253.439157 148.484867 486.75754 135.400013Z",
      "p-id": "1978",
      "fill": "#666666"
    }
  })]), _vm._v("\n      正在加载\n    ")] : [_c('svg', {
    class: {
      'icon-reverse': _vm.flag
    },
    staticStyle: {
      "width": "1rem",
      "height": "1rem",
      "vertical-align": "middle",
      "fill": "currentColor",
      "overflow": "hidden"
    },
    attrs: {
      "t": "1497366759944",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "1040"
    }
  }, [_c('path', {
    attrs: {
      "d": "M921.6 563.2c-9.6-9.6-25.6-9.6-35.2 0L544 896l0-822.4c0-12.8-9.6-22.4-25.6-22.4s-25.6 9.6-25.6 22.4L492.8 896l-342.4-339.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 22.4 0 32l384 377.6c6.4 6.4 12.8 6.4 19.2 6.4 0 0 0 0 0 0 3.2 0 3.2 0 6.4 0 0 0 0 0 3.2 0 3.2 0 6.4-3.2 9.6-6.4l380.8-371.2C931.2 588.8 931.2 572.8 921.6 563.2z",
      "p-id": "1041",
      "fill": "#666666"
    }
  })]), _vm._v("\n      " + _vm._s(_vm.msg) + "\n    ")]], 2), _vm._v(" "), _vm._t("list")], 2)
},staticRenderFns: []}

/***/ })
],[5]);
//# sourceMappingURL=app.1e0879d5aec6245007e3.js.map