<template>
  <div>
    <canvas height="750px" width="1000px" id="canvas"></canvas>
    <!-- 调用组件  -->
    <draggable element="ul" v-model="imageList" id="drag">
      <div v-for="imgs in imageList" :key="imgs.index" class="dragItem">
        <div class="close">
          <span>{{ imgs.title }}</span>
          <span @click="deleteImg(imgs)" title="close this item">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <img :src="imgs.src" :alt="imgs.title" />
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("imgList");
export default {
  name: "dragDemo",
  data() {
    return {
      canvas: null,
      cs: null,
      image1: null
    };
  },
  computed: {
    imageList: {
      get() {
        return this.$store.getters["imgList/imageList"];
      },
      set(newVal) {
        this.setNewImg(newVal);
        // this.init();
      }
    }
  },
  watch: {
    imageList(newVal, oldVal = []) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["deleteImg", "setNewImg"]),
    // deleteImage(){
    //   this.deleteImg();
    //   this.init();
    // },
    init() {
      this.canvas = document.getElementById("canvas");
      this.cs = this.canvas.getContext("2d");
      this.image1 = new Image();
      this.image1.onload = () => {
        this.drawImage();
      };
      this.image1.src = this.imageList[0].src;
    },
    drawImage() {
      this.cs.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.cs.drawImage(
        this.image1,
        0, //x
        0, //y
        this.canvas.width, //width
        this.canvas.height //height
      );
    }
  },

  components: { draggable }
};
</script>
<style scoped>
.dragItem {
  /* flex: 1 1 auto; */
  margin-left: 10px;
}
#drag {
  padding: 0;
  /* margin-top: 350px; */
  position: relative;
  display: flex;
  /* border: 1px solid black; */
  overflow: auto;
}
img {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
</style>
