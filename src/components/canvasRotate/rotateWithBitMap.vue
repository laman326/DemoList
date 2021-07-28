<template>
  <div>
    <div class="toolBar">
      <el-button @click="rotate(90)"
        ><i class="el-icon-refresh-right"></i
      ></el-button>
      <el-button @click="rotate(-90)"
        ><i class="el-icon-refresh-right" style="transform:scaleX(-1)"></i
      ></el-button>
      <el-button @click="reverse('y')">
        <i class="el-icon-sort"></i>
      </el-button>
      <el-button @click="reverse('x')">
        <i class="el-icon-sort" style="transform:rotate(90deg)"></i>
      </el-button>
    </div>
    <div class="canvasItems">
      <!-- <canvas id="cs1" width="400px" height="400px"></canvas> -->
      <canvas
        id="cs2"
        width="1314px"
        height="1300px"
        style="position:relative;left:0;top:0;border:1px solid black"
      >
      </canvas>
      <div
        style="width:298px;height:298px;position:absolute ;left:440px;top:900px;border:1px solid black;z-index:-1;background-color:skyblue;"
      ></div>
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
      cs2: null
    };
  },
  mounted() {
    // this.canvas1 = document.getElementById("cs1");
    // // console.log('this.canvas1.width',this.canvas1.width);
    // this.cs1 = this.canvas1.getContext("2d");
    this.canvas2 = document.getElementById("cs2");
    this.cs2 = this.canvas2.getContext("2d");

    this.image1 = new Image();
    // this.img=this.image1
    let bitMap;
    this.image1.onload = async () => {
      console.log("this.image1.width", this.image1.width);
      let offsreen = new OffscreenCanvas(this.image1.width, this.image1.height);
      // let offsreen = new OffscreenCanvas(this.image1.height, this.image1.width);
      let offCtx = offsreen.getContext("2d");
      // offCtx.translate(0, this.image1.height);
      // offCtx.rotate((270 * Math.PI) / 180);
      //左右翻转
      // offCtx.translate(this.image1.width,0);
      // offCtx.scale(-1,1);
      //上下翻转
      // offCtx.translate(0,this.image1.height);
      // offCtx.scale(1,-1);
      // 左旋90°
      offCtx.translate(0, this.image1.height);
      offCtx.rotate((-90 * Math.PI) / 180);
      //右旋90°
      // offCtx.translate(this.image1.width, 0);
      // offCtx.rotate((90 * Math.PI) / 180);


      // offCtx.translate(0, 50);
      // offCtx.rotate((90 * Math.PI) / 180);


      offCtx.drawImage(this.image1, 0, 0,this.image1.width,this.image1.height );
      // offCtx.drawImage(this.image1, 0, 0,this.image1.height,this.image1.width );
      bitMap = await offsreen.transferToImageBitmap();
    
      console.log("bitMap", bitMap);
      this.drawImage(bitMap, this.cs2);

      // bitMap = await createImageBitmap(this.image1, 0, 0, 1280, 853);
      // // bitMap= await createImageBitmap(this.image1);
      // console.log("bitMap", bitMap);

      // this.drawImage(this.image1, this.cs1);
      // this.drawImage(bitMap, this.cs2);
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
        // 853,
        // 1280
        1280, //width
        853 //height
      );
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
