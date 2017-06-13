<template>
  <div id="app">
    <pull-refresh>
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
        {
          title: '什么是伪类？作为JavaScript程序员的你知道吗?',
          img: ''
        },
        {
          title: 'JavaScript实现简单的双向数据绑定（Ember、Angular、Vue）',
          img: ''
        },
        {
          title: 'WebView性能、体验分析与优化',
          img: ''
        },
        {
          title: '模块化JavaScript组件开发指南',
          img: ''
        },
        {
          title: '前端高手教你高效管理数据：将JSON API和Redux结合使用',
          img: ''
        },
        {
          title: '前端每周清单第 17 期：大前端技术生命周期模型；WWDC 发布 Safari 11；面向生产环境的前端性能优化',
          img: ''
        },
        {
          title: '前端不为人知的一面——前端冷知识集锦',
          img: ''
        },
        {
          title: 'Web前端开发工程师需要掌握哪些核心技能？',
          img: ''
        },
        {
          title: '探讨后端选型中不同语言及对应的Web框架',
          img: ''
        },
        {
          title: '有一本书，适合零到十年经验的程序员看',
          img: ''
        },
        {
          title: 'JavaScript 的装饰器：它们是什么及如何使用',
          img: ''
        },
        {
          title: '移动端一个像素问题解决方案',
          img: ''
        },
      ]
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
