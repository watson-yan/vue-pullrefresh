<template>
  <div ref="container" class="vue-pull-refresh">
    <div class="vue-pull-refresh-msg">
      <template v-if="loading">
        <svg t="1497367491334"
          viewBox="0 0 1024 1024"
          class="vue-pull-refresh-loading"
          style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" 
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1977">
          <path d="M486.75754 135.400013 402.25163 59.310554C388.509379 46.936957 387.96346 25.139993 400.208308 11.540621 412.822131-2.468343 433.957671-4.001381 447.930113 8.579401L601.089596 146.484825C605.090636 150.087331 607.97301 154.488612 609.74682 159.253816 614.767405 170.908986 613.043155 184.73657 603.956951 194.827778L466.051527 347.987261C453.677999 361.729512 431.880966 362.275431 418.281663 350.030583 404.27263 337.416761 402.739592 316.281152 415.320374 302.308778L504.712387 203.028852C300.714847 206.912339 136.539841 373.49343 136.539841 578.419721 136.539841 785.780633 304.639089 953.87988 512 953.87988 720.609624 953.87988 887.460159 790.22062 887.460159 584.090467 887.460159 517.424512 870.092464 453.371077 837.556793 396.914498 828.144212 380.58164 833.754269 359.710766 850.087128 350.298184 866.420054 340.885671 887.29086 346.49566 896.703442 362.828587 935.174114 429.583765 955.725642 505.37934 955.725642 584.090467 955.725642 828.220806 758.019723 1022.145363 512 1022.145363 266.937086 1022.145363 68.274358 823.482635 68.274358 578.419721 68.274358 341.828486 253.439157 148.484867 486.75754 135.400013Z" p-id="1978" fill="#666666">
          </path>
        </svg>
        正在加载
      </template>
      <template v-else>
        <svg t="1497366759944" 
             viewBox="0 0 1024 1024"
             :class="{'icon-reverse': flag}"
             style="width: 1rem; height: 1rem; vertical-align: middle;fill: currentColor;overflow: hidden;"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1040">
          <path d="M921.6 563.2c-9.6-9.6-25.6-9.6-35.2 0L544 896l0-822.4c0-12.8-9.6-22.4-25.6-22.4s-25.6 9.6-25.6 22.4L492.8 896l-342.4-339.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 22.4 0 32l384 377.6c6.4 6.4 12.8 6.4 19.2 6.4 0 0 0 0 0 0 3.2 0 3.2 0 6.4 0 0 0 0 0 3.2 0 3.2 0 6.4-3.2 9.6-6.4l380.8-371.2C931.2 588.8 931.2 572.8 921.6 563.2z" p-id="1041" fill="#666666">
          </path>
        </svg>
        {{msg}}
      </template>
    </div>
    <slot name="list"></slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: '',
        flag: 0, // 表示是否达到刷新条件
        loading: 0,  // 表示是否正在刷新中
        touchStart: 0,  // 手指触摸屏幕的起点
        distance: 0     // 手指滑动的距离
      }
    },
    mounted() {
      const container = this.$refs.container
      container.addEventListener('touchstart', (e) => {
        if (this.loading) {
          e.preventDefault()
          return
        }
        // 取第一个手指的触摸点作为起始点
        this.touchStart = e.targetTouches[0].clientY
      })
      container.addEventListener('touchmove', (e) => {
        // 如果没有触摸起始点，返回
        if (!this.touchStart) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          return
        }

        const touch = e.targetTouches[0]
        const scrollTop = container.scrollTop
        if (scrollTop === 0) {
          this.distance = touch.clientY - this.touchStart
          if (this.distance > 0) {
            e.preventDefault()
            if (this.distance < 80) {
              container.style.overflow = 'inherit'
              container.style.transform = 'translate3D(0px, ' + this.distance +'px, 0px)'
              if (this.distance > 55) {
                  console.warn('释放刷新')
                  this.msg = '释放刷新'
                  this.flag = 1
              } else {
                  this.msg = '下拉刷新'
              }
            }
          }
        }
      })
      container.addEventListener('touchend', (e) => {
        if (this.distance === 0) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          return
        }
        
        if (this.flag && this.distance > 0) {
          container.style.transform = 'translate3D(0px, 50px, 0px)'
          this.loading = 1
          setTimeout(() => {
              this.flag = 0
              this.loading = 0
              container.scrollTop = 0
              container.style.overflow = 'auto'
              container.style.transform = 'translate3D(0px, 0px, 0px)'
          }, 1600)
          return
        }
        this.flag = 0
        container.style.overflow = 'auto'
        container.style.transform = 'translate3D(0px, 0px, 0px)'
      })
    }
  }
</script>
<style>
  .vue-pull-refresh {
    height: 100%;
    overflow-y: auto;
    transition: 330ms;
  }
  .vue-pull-refresh-msg {
    margin-top: -50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #666;
    border-bottom: 1px solid #eee;
  }
  .vue-pull-refresh-msg .icon-reverse {
    transform: rotate(180deg);
    transition: all .3s ease;
  }
  .vue-pull-refresh-loading {
    -webkit-animation:loadRotate 1s linear infinite;
    animation:loadRotate 1s linear infinite;
  }
  @-webkit-keyframes loadRotate{
    from{
      -webkit-transform: rotate(0deg);
    }
    to{
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes loadRotate{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>