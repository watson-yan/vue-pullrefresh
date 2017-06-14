<template>
  <div id="app">
    <pull-refresh :next="refresh">
      <div slot="list">
        <section v-for="item of list" class="list-item">
          {{item.title}}
        </section>
      </div>
    </pull-refresh>
  </div>
</template>

<script>
import pullRefresh from './components/pullRefresh'

export default {
  name: 'app',
  data() {
    return {
      list: [
        { title: '什么是伪类？作为JavaScript程序员的你知道吗?' },
        { title: 'JavaScript实现简单的双向数据绑定（Ember、Angular、Vue）' },
        { title: 'WebView性能、体验分析与优化' },
        { title: '模块化JavaScript组件开发指南' },
        { title: '前端高手教你高效管理数据：将JSON API和Redux结合使用' },
        { title: '前端每周清单第 17 期：大前端技术生命周期模型；WWDC 发布 Safari 11；面向生产环境的前端性能优化' },
        { title: '前端不为人知的一面——前端冷知识集锦' },
        { title: 'Web前端开发工程师需要掌握哪些核心技能？' },
        { title: '探讨后端选型中不同语言及对应的Web框架' },
        { title: '有一本书，适合零到十年经验的程序员看' },
        { title: 'JavaScript 的装饰器：它们是什么及如何使用' },
        { title: '移动端一个像素问题解决方案' }
      ],
      backup: [
        { title: 'Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果' },
        { title: '混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项' },
        { title: '由于多个状态分散的跨越在许多组件和交互间各个角落，大型应用复杂度也经常逐渐增长。为了解决这个问题，Vue 提供 vuex' },
        { title: 'Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。' },
        { title: '除了默认设置的核心指令( v-model 和 v-show ),Vue 也允许注册自定义指令。' },
        { title: '混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项。' },
        { title: 'Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据' },
        { title: '模板内的表达式是非常便利的，但是它们实际上只用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护' },
        { title: '许多事件处理的逻辑都很复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的' },
        { title: 'Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新' }
      ]
    }
  },
  methods: {
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const appendList = []
          const temp = {}
          while (appendList.length < 3) {
            const index = Math.floor(Math.random() * 10)
            if (!temp[`attr${index}`]) {
              temp[`attr${index}`] = this.backup[index]
              appendList.push(this.backup[index])
            }
          }
          for (let i = 0; i < appendList.length; i++) {
              this.list.unshift(appendList[i])
          }
          resolve()
        }, 2000)
      })
    }
  },
  components: {
    pullRefresh
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.list-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
</style>
