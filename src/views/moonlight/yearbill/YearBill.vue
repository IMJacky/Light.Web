<template>
  <div class="flex">
    <swiper ref="mySwiper" :options="swiperOptions" :style="{ height: swiperHeight, width: swiperWidth }">
      <swiper-slide>
        <div class="bgimg1">fuck</div>
      </swiper-slide>
      <swiper-slide>
        <div class="bgimg2">fuck</div>
      </swiper-slide>
      <swiper-slide>
        <div class="bgimg3">fuck</div>
      </swiper-slide>
      <swiper-slide>
        <div class="bgimg4">fuck</div>
      </swiper-slide>
      <swiper-slide>
        <div class="bgimg5">fuck</div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'carrousel',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        direction: 'vertical'
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    },
    swiperHeight () {
      return window.innerHeight + 'px'
    },
    swiperWidth () {
      return window.innerWidth + 'px'
    }
  }
}
</script>
<style scoped>
.flex {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  text-align: justify;
  max-width: 600px;
  /*height: 200px; */
  margin: 0 auto;
}

.bgimg1 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(/bill/bill1.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.bgimg2 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(/bill/bill2.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.bgimg3 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(/bill/bill3.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.bgimg4 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(/bill/bill4.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.bgimg5 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(/bill/bill5.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>
