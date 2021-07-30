<template>
  <div>
    <el-button type="text" @click="goToMall">去商场</el-button>
    <el-button type="text" @click="goToCanvas">横线对比canvas</el-button>
    <el-button type="text" @click="goToZoom">师兄对比canvas</el-button>
    <el-button type="text" @click="goToSwiper">轮播图</el-button>
    <el-button type="text" @click="goToDrag">拖拽列表</el-button>
    <el-button type="text" @click="goToModal">蒙版</el-button>
    <el-button type="text" @click="goToDragModal">带蒙版的拖拽</el-button>
    <el-button type="text" @click="goToGallery">游廊用起来</el-button>
    <el-button type="text" @click="goToRotate">旋转图片</el-button>
    <el-button type="text" @click="goToBroadCast">事件广播</el-button>
    <el-button type="text" @click="goToRotateWithBitMap"
      >BitMap图片旋转</el-button
    >
    <el-button type="text" @click="goToOffsrceern">离屏绘图</el-button>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {
    goToCanvas() {
      this.$router.push("/canvas");
    },
    goToMall() {
      this.$router.push("/mall");
    },
    goToSwiper() {
      this.$router.push("/swiper");
    },
    goToZoom() {
      this.$router.push("/canvas-image");
    },
    goToDrag() {
      this.$router.push("/drag-demo");
    },
    goToModal() {
      this.$router.push("/modal");
    },
    goToDragModal() {
      this.$router.push("/dragModal");
    },
    goToGallery() {
      this.$router.push("/galleryDemo");
    },
    goToRotate() {
      this.$router.push("/rotate");
    },
    goToBroadCast() {
      this.$router.push("/broadCast");
    },
    goToRotateWithBitMap() {
      this.$router.push("/rotateWithBitMap");
    },
    goToOffsrceern() {
      this.$router.push("/testOffsrceern");
    }
  },
  components: {}
};
</script>
<style scoped></style>
