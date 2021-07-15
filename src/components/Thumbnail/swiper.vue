<template>
  <div>
    <canvas height="600px" width="1000px" id='canvas'></canvas>

    <swiper :options="swiperOption" ref="mySwiper" @slideChange="testChange">
      <!-- 轮播块 -->

      <swiper-slide v-for="imgs in imageList" :key="imgs.id">
        <div class="close">
          <span>{{ imgs.title }}</span>
          <span @click="deleteImg(imgs)" title="close this item">
            <i class="el-icon-close"></i>
          </span>
        </div>

        <img :src="imgs.src" :alt="imgs.title" />
      </swiper-slide>
      <!-- 一些控制组件 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("imgList");
export default {
  name: "carrousel",
  data() {
    return {
      canvas:null,
      cs:null,
      image1:null,
      image2:null,
      swiperOption: {
        loop: false, // true循环轮播;false不循环轮播
        autoplay: false, // true自动播放;false不自动播放
        pagination: {
          el: ".swiper-pagination" // 分页器
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // }
        // grabCursor: true,

        slidesPerView: 3,
        watchOverflow: true
        // 其他的所有的参数同 swiper 官方 api 参数
      }
    };
  },
  computed: {
    ...mapGetters(["imageList"]),
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.init();
    // current swiper instance
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(0, 0, false);
  },
  methods: {
    ...mapActions(["deleteImg"]),
    init() {
      this.canvas = document.getElementById("canvas");
      this.cs = this.canvas.getContext("2d");
      this.image1 = new Image();
      this.image2 = new Image();
      this.image1.onload=()=>{
        this.drawImage();

      }
      this.image1.src=this.imageList[this.$refs.mySwiper.swiper.activeIndex].src;
      // console.log("----", this.imageList);
    },
    testChange() {
      console.log("切换啦！！！");
      console.log(
        `----------此时的active滑块是------------`,
        this.$refs.mySwiper.swiper.activeIndex
      );
      this.init();
    },
    drawImage(){
      this.cs.clearRect(0, 0, canvas.width, canvas.height);
      this.cs.drawImage(
        this.image1,
        0, //x
        0, //y
        this.canvas.width, //width
        this.canvas.height //height
      );

    }
    // removeImages() {
    //   console.log("删除");
    // }
  }
};
</script>
<style scoped>
img {
  /* /* width: 200px; */
  height: 200px;
  object-fit: contain;
}
.swiper-container {
  height: 300px;
}
.swiper-slide {
  height: 300px;
}
</style>
