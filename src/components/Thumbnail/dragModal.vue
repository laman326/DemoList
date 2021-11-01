<template>
  <div>
    <div class="modal" >
      <div
        style="background-color:#f1f2f3 ;width:200px;height:100%;border:1px solid"
        @click="clickOptions"
      >
        <el-button  size="small" type="text" @click="clickModal">隐藏列表</el-button>
        <draggable  v-model="imageList" id="drag">
          <div v-for="imgs in imageList" :key="imgs.index" class="dragItem">
            <div class="close">
              <span>{{ imgs.title }}</span>
              <span
                @click="deleteImg(imgs)"
                title="close this item"
                style="float:right"
              >
                <i class="el-icon-close"></i>
              </span>
            </div>
            <img :src="imgs.src" :alt="imgs.title" />
          </div>
        </draggable>
      </div>
    </div>
    <div class="toolbar">
        <button @click="displayModal">已选图片</button>
    </div>
    <div class="content"></div>
        <canvas height="750px" width="1200px" id="canvas"></canvas>
    </div>
    
    <!-- 调用组件  -->
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("imgList");
export default {
  name: "dragModal",
  components: { draggable },
  data() {
    return {
      canvas: null,
      cs: null,
      image1: null,
      modalItem: null
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
      this.modalItem = document.getElementsByClassName("modal")[0];
    // this.init();
  },
  methods: {
    ...mapActions(["deleteImg", "setNewImg"]),
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
    },
    clickOptions(e) {
      e.stopPropagation();
    },

    clickModal(e) {
      console.log(`----------点击蒙版------------`);
        this.modalItem.style.display = "none";
    },
     displayModal() {
      this.modalItem.style.display = "inline";
      console.log("唤醒");
    }
  },

  
};
</script>
<style scoped>
.dragItem {
  margin-top: 10px;
}

#drag {
  float: left;
  height: 920px;
  padding: 0;
  overflow: auto;
}
#drag::-webkit-scrollbar {
  display: none;
}
img {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
.modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  /* position:absolute;
  z-index: 200; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
