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
        height="400px"
        style="position:relative;left:0;top:0;border:1px solid black"
      >
      </canvas>
      <canvas
        id="cs1"
        width="500px"
        height="400px"
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
      bitMap: null,
      canvasPosition: null,
      count: 1,
      imgScale: 1,
      mousex: 0,
      mousey: 0,
      cWidth: 0,
      cHeight: 0,
      cWidth1: 0,
      cHeight1: 0,
      isMouseDown: false
    };
  },
  mounted() {
    this.canvas2 = document.getElementById("cs2");
    this.cs2 = this.canvas2.getContext("2d");
    this.canvas1 = document.getElementById("cs1");
    this.cs1 = this.canvas1.getContext("2d");
    this.cWidth = this.canvas2.width;
    this.cHeight = this.canvas2.height;
    this.cWidth1 = this.canvas2.width;
    this.cHeight1 = this.canvas2.height;
    this.image1 = new Image();
    this.image1.onload = async () => {
      let offsreen = new OffscreenCanvas(this.image1.width, this.image1.height);
      let offCtx = offsreen.getContext("2d");
      offCtx.drawImage(this.image1, 0, 0);
      this.bitMap = await offsreen.transferToImageBitmap();
      this.imagePosition = this.getImageInitPos(this.canvas2, this.bitMap);
      this.drawImage(this.bitMap, this.cs2);
      this.drawImage(this.bitMap, this.cs1);
    };
    this.image1.src = "../../../static/flower.jpg";

    console.log("this.imagePosition", this.imagePosition);

    this.canvasPosition = this.canvas2.getBoundingClientRect();
    this.canvas2.addEventListener(
      "mousewheel",
      evt => {
        this.handleScroll(evt); //鼠标滚动触发
      },
      false
    );
    this.canvas2.addEventListener(
      "mousedown",
      evt => {
        this.handleMouseDown(evt); //鼠标按下
      },
      false
    );
    document.body.addEventListener(
      "mouseup",
      () => {
        this.handleMouseUp();
      },
      false
    );
    this.canvas2.addEventListener(
      "mousemove",
      evt => {
        this.handleMouseMove(evt);
      },
      false
    );
  },
  computed: {},
  methods: {
    drawImage(image, cs) {
      let { x, y, width, height } = this.imagePosition;
      // console.log('cs.width',this.canvas2.width);
      // console.log('width',width);

      // console.log('x',x);
      // console.log('y',y);

      cs.clearRect(0, 0, this.canvas2.width, this.canvas2.height); //在给定的矩形内清除指定的像素
      cs.drawImage(
        image,
        x, //x
        y, //y
        width,
        height
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
        [this.imagePosition.width, this.imagePosition.height] = [
          this.imagePosition.height,
          this.imagePosition.width
        ];
      } else if (degree > 0) {
        offCtx.translate(this.bitMap.height, 0);
        offCtx.rotate((90 * Math.PI) / 180);
        [this.imagePosition.width, this.imagePosition.height] = [
          this.imagePosition.height,
          this.imagePosition.width
        ];
      }
      //旋转后保持居中

      if (this.canvas2.width - this.imagePosition.width >= 0) {
        this.imagePosition.x = (this.canvas2.width - this.imagePosition.width) / 2;
      }

      // if (this.canvas2.height - this.imagePosition.height >= 0) {
        this.imagePosition.y = (this.canvas2.height - this.imagePosition.height) / 2;
      // }
      //但是这样放大之后旋转就完全不是原来的位置了


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
        //左右翻转
        offCtx.translate(this.bitMap.width, 0);
        offCtx.scale(-1, 1);
      } else if (direction > 0) {
        //上下翻转
        offCtx.translate(0, this.bitMap.height);
        offCtx.scale(1, -1);
      }
      // this.getTransformPosition(direction);
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
    },
    //滚轮缩放事件
    handleScroll(evt) {
      let newMouseLocation = this.windowToCanvas(
        this.canvas2,
        evt.clientX,
        evt.clientY
      );

      this.mousex = newMouseLocation.x;
      this.mousey = newMouseLocation.y;
      let delta = evt.wheelDelta / 120;
      this.imagePosition = this.zoom(this.mousex, this.mousey, delta);
      this.drawImage(this.bitMap, this.cs2);
    },
    //鼠标按下事件
    handleMouseDown(evt) {
      this.mouseLocation = this.windowToCanvas(
        this.canvas2,
        evt.clientX,
        evt.clientY
      );
      this.isMouseDown = true;
    },
    // 鼠标弹起
    handleMouseUp() {
      this.canvas2.style.cursor = "default";
      this.isMouseDown = false;
    },
    //鼠标移动
    handleMouseMove(event) {
      console.log("this.isMouseDown", this.isMouseDown);
      if (this.isMouseDown) {
        this.canvas2.style.cursor = "move";
        let mouseLocation = this.windowToCanvas(
          this.canvas2,
          event.clientX,
          event.clientY
        );
        if (this.isDivArea({ x: event.clientX, y: event.clientY })) {
          let dx = mouseLocation.x - this.mouseLocation.x; //鼠标最新在的位置-鼠标按下时的位置
          let dy = mouseLocation.y - this.mouseLocation.y;
          this.mouseLocation = mouseLocation; //把最新的位置赋值给鼠标按下时的位置
          this.imagePosition.x += dx;
          this.imagePosition.y += dy;
        } else {
          //鼠标移动至画布范围外，置鼠标弹起
          this.canvas2.style.cursor = "default";
          this.isMouseDown = false;
        }
        this.drawImage(this.bitMap, this.cs2);
      }
    },
    zoom(mousex, mousey, delta) {
      let factor = 1 + 0.1 * delta;
      let x = mousex - (mousex - this.imagePosition.x) * factor;
      let y = mousey - (mousey - this.imagePosition.y) * factor;
      let height = this.imagePosition.height * factor;
      let width = this.imagePosition.width * factor;
      this.imgScale *= factor;
      return {
        x,
        y,
        height,
        width
      };
    },

    //旋转翻转定位到原来的可视区域
    // getTransformPosition(transform) {
    //   console.log("this.imagePosition----before", this.imagePosition);
    //   let { x, y, width, height } = this.imagePosition;

    //   if (transform === 1) {
    //     this.imagePosition.y = -(height + y - this.canvas2.height);
    //   } else if (transform === -1) {
    //     this.imagePosition.x = -(width + x - this.canvas2.width);
    //   } else if (transform === 90) {
    //     //顺时针
    //     this.imagePosition.width = height;
    //     this.imagePosition.height = width;
    //     this.imagePosition.y = x;
    //     this.imagePosition.x = -(height + y - this.cHeight);
    //     // this.imagePosition.x = -(height + y - this.canvas2.height);
    //     let cwidth = this.cWidth;
    //     this.cWidth = this.cHeight;
    //     this.cHeight = cwidth;
    //   } else {
    //     this.imagePosition.width = height;
    //     this.imagePosition.height = width;
    //     this.imagePosition.x = y;
    //     // this.imagePosition.y = -(width + x - this.canvas2.width);

    //     this.imagePosition.y = -(width + x - this.cWidth1);
    //     let cwidth1 = this.cWidth1;
    //     this.cWidth1 = this.cHeight1;
    //     this.cHeight1 = cwidth1;
    //   }
    //   // console.log("this.imagePosition----after", this.imagePosition);
    // },
    windowToCanvas(canvas, x, y) {
      return {
        x: x - this.canvasPosition.left,
        y: y - this.canvasPosition.top
      };
    },
    isDivArea(point) {
      if (
        point.x < 0 ||
        point.x > this.canvas2.width ||
        point.y < 0 ||
        point.y > this.canvas2.height
      ) {
        return false;
      }
      return true;
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
