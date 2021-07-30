<template>
  <div>
    <div class="toolBar">
      <el-button @click="rotate(-90)"
        ><i class="el-icon-refresh-right" style="transform:scaleX(-1)"></i
      ></el-button>
      <el-button @click="rotate(90)"
        ><i class="el-icon-refresh-right"></i
      ></el-button>
      <el-button @click="reverse(1)">
        <i class="el-icon-sort"></i>
      </el-button>
      <el-button @click="reverse(-1)">
        <i class="el-icon-sort" style="transform:rotate(90deg)"></i>
      </el-button>
    </div>
    <div class="canvasItems">
      <canvas
        id="cs2"
        width="500px"
        height="500px"
        style="position:relative;left:0;top:0;border:1px solid black"
      >
      </canvas>
    </div>
  </div>
</template>
<script>
export default {
  name: "rotateWithBitMap",
  data() {
    return {
      image1: null,
      canvas1: null,
      cs1: null,
      image2: null,
      canvas2: null,
      cs2: null,
      bitMap: null
    };
  },
  mounted() {
    this.canvas2 = document.getElementById("cs2");
    this.cs2 = this.canvas2.getContext("2d");
    this.image1 = new Image();
    this.image1.onload = async () => {
      console.log("this.image1.width", this.image1.width);
      this.drawImage(this.image1, this.cs2);
      let offsreen = new OffscreenCanvas(this.image1.width, this.image1.height);
      let offCtx = offsreen.getContext("2d");
      offCtx.drawImage(this.image1, 0, 0);
      this.bitMap = await offsreen.transferToImageBitmap();
    };
    this.image1.src = "../../../static/flower.jpg";
  },
  computed: {},
  methods: {
    drawImage(image, cs) {
      cs.clearRect(0, 0, 300, 300); //在给定的矩形内清除指定的像素
      cs.drawImage(
        image,
        0, //x
        0, //y
        500,
        500
      );
    },
    async rotate(degree) {
      let offscreenWidth = this.bitMap.height;
      let offscreenHight = this.bitMap.width;

      let offsreen = new OffscreenCanvas(offscreenWidth, offscreenHight);
      let offCtx = offsreen.getContext("2d");

      if (degree < 0) {
        offCtx.translate(0, this.bitMap.width);
        offCtx.rotate((-90 * Math.PI) / 180);
      } else if (degree > 0) {
        offCtx.translate(this.bitMap.height, 0);
        offCtx.rotate((90 * Math.PI) / 180);
      }
      offCtx.drawImage(this.bitMap, 0, 0);
      this.bitMap = await offsreen.transferToImageBitmap();
      this.drawImage(this.bitMap, this.cs2);
    },
    async reverse(direction) {
      let offscreenWidth = this.bitMap.width;
      let offscreenHight = this.bitMap.height;

      let offsreen = new OffscreenCanvas(offscreenWidth, offscreenHight);
      let offCtx = offsreen.getContext("2d");
      if (direction < 0) {
        offCtx.translate(this.bitMap.width, 0);
        offCtx.scale(-1, 1);
      } else if (direction > 0) {
        offCtx.translate(0, this.image1.height);
        offCtx.scale(1, -1);
      }
      offCtx.drawImage(this.bitMap, 0, 0);
      this.bitMap = await offsreen.transferToImageBitmap();
      this.drawImage(this.bitMap, this.cs2);
    },
    getImageInitPos(canvas, image) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = image.width;
      const ih = image.height;
      const canvasRadio = cw / ch;
      const imageRadio = iw / ih;
      let x = 0;
      let y = 0;
      let height = ch;
      let width = cw;
      let widthScaleRatio = iw / cw;
      let heightScaleRatio = ih / ch;
      if (canvasRadio > imageRadio) {
        //比较高，所以高占100%,宽居中
        width = canvas.height * imageRadio;
        x = (canvas.width - width) / 2;
        this.initHeight = ih / heightScaleRatio;
        this.initWidth = width;
      } else {
        //比较宽，所以宽占100%,高居中
        height = canvas.width / imageRadio;
        y = (canvas.height - height) / 2;
        this.initWidth = iw / widthScaleRatio;
        this.initHeight = height;
      }
      return {
        x,
        y,
        width,
        height
      };
    }
  },
  components: {}
};
</script>
<style scoped>
img {
  transform: rotate(90deg);
}
</style>
