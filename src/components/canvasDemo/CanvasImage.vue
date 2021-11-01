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
    <div id="canvas-image">
      <canvas
        ref="canvas"
        width="800"
        height="800"
        style="border: 1px solid #000000; background-color: white"
      >
      </canvas>
      <el-button @click="testScale">test scale</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "canvas-image",
  data: function() {
    return {
      degree: 0,
      scaleX: 1,
      scaleY: 1,
      canvas: undefined,
      image: undefined,
      isMouseDown: false,
      mousePos: {},
      imagePos: {},
      reserveDegree: "scaleX(1) scaleY(1)",
    };
  },
  watch: {},
  methods: {
    testScale() {
      // this.ctx.translate(0, 0)
      this.ctx.scale(5, 5);
      this.drawImage(this.image, { ix: 0, iy: 0, iw: 800, ih: 800 });
      // this.drawImage(this.image, { ix: 0, iy: 0, iw: 800 * 5, ih: 800 * 5 })
    },
    // 根据canvas,image宽高自动返回iamge水平竖直居中效果 类似 object-fit:contain
    getImageInitPos(canvas, image) {
      const canvasRadio = canvas.width / canvas.height;
      const imageRadio = image.width / image.height;
      const position = {
        ix: 0,
        iy: 0,
        ih: canvas.height,
        iw: canvas.width
      };
      console.log("position1", position);
      // 宽度100% 填充  高度 居中
      if (canvasRadio <= imageRadio) {
        position.ih = canvas.width / imageRadio; //宽度100%,则x位置不变，y位置使得图片居中(即iy),为了保持比例，图片的高度需要进行缩放，即ih
        console.log("position.ih", position.ih);
        console.log("canvas.height", canvas.height);
        position.iy = (canvas.height - position.ih) / 2;
      } else {
        // 高度100% 填充  水平 居中
        position.iw = canvas.height * imageRadio; //高度100%,为了保持比例,重新计算iw
        position.ix = (canvas.width - position.iw) / 2; //则y位置不变，x位置使得图片居中(即ix),
      }
      console.log("position", position);
      return position;
    },
    doMouseDown(e) {
      this.isMouseDown = true;
      this.canvas.style.cursor = "move";
      const mousePos = this.transformEventToCanvasPos(
        this.canvas,
        e.clientX,
        e.clientY
      );
      this.mousePos = mousePos;
      // console.info(`-----------mouse down-----------`)
      // console.log('e', e)
    },
    // 每11~12ms调用一次
    doMouseMove(e) {
      if (!this.isMouseDown) return;
      const mousePos = this.transformEventToCanvasPos(
        this.canvas,
        e.clientX,
        e.clientY
      );
      const offset = this.getOffset(this.mousePos, mousePos);
      this.mousePos = mousePos;
      this.imagePos.ix += offset.offsetX;
      this.imagePos.iy += offset.offsetY;
      this.drawImage(this.image, this.imagePos);
    },
    drawImage(image, pos) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const { ix, iy, iw, ih } = pos;
      //developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
      this.ctx.drawImage(image, ix, iy, iw, ih);
    },
    getOffset(oldPos, newPos) {
      return {
        offsetX: newPos.mx - oldPos.mx,
        offsetY: newPos.my - oldPos.my
      };
    },
    doMouseUp(e) {
      this.isMouseDown = false;
      this.canvas.style.cursor = "default";
      // console.info(`-----------mouse up-----------`)
      // console.log('e', e)
    },
    doMouseScroll(e) {
      console.log("e.wheelDelta", e.wheelDelta);
      const delta = e.wheelDelta / 120;
      console.log("delta", delta);
      const mousePos = this.transformEventToCanvasPos(
        this.canvas,
        e.clientX,
        e.clientY
      );
      console.log("mousePos", mousePos);
      // Todo:边界判断
      const newImagePos = this.getZoomPos(this.imagePos, mousePos, delta);
      this.imagePos = newImagePos;
      this.drawImage(this.image, newImagePos);
    },
    getZoomPos(imagePos, mousePos, delta) {
      const rate = 1 + 0.1 * delta;
      console.log("rate", rate);
      const { mx, my } = mousePos;
      const { ix, iy, iw, ih } = imagePos;
      const newImagePos = {};
      newImagePos.iw = iw * rate;
      newImagePos.ih = ih * rate;
      newImagePos.iy = my - (my - iy) * rate;
      newImagePos.ix = mx - (mx - ix) * rate;
      return newImagePos;
    },
    canvasEventInit() {
      this.time = Date.now();
      this.canvas.addEventListener("mousedown", this.doMouseDown, false);

      this.canvas.addEventListener("mousemove", this.doMouseMove, false);

      this.canvas.addEventListener("mouseup", this.doMouseUp, false);
      this.canvas.addEventListener("mousewheel", this.doMouseScroll, false);
    },
    transformEventToCanvasPos(canvas, x, y) {
      var { left, top } = this.canvas.getBoundingClientRect(); //getBoundingClientRect获取元素相对于视窗的位置集合
      return {
        mx: x - left,
        my: y - top
      };
    },
    rotate(degree) {
      this.degree += degree;
      this.degree = this.degree % 360;
      console.log("current", this.degree);
      this.transform();
    },
    reverse(direction) {
      let reDirection = Math.abs(this.degree / 90);
      console.log("reDirection", reDirection);
      if (reDirection === 1 || reDirection === 3) {
        if (direction === "x") {
          direction = "y";
        } else if (direction == "y") {
          direction = "x";
        }
      }

      if (direction === "x") {
        this.scaleX *= -1;
      } else if (direction === "y") {
        this.scaleY *= -1;
      }
      this.reserveDegree =
        "scaleX(" + this.scaleX + ")" + "scaleY(" + this.scaleY + ")";
      this.transform();
    },
    transform() {
      let rotate = "rotate(" + this.degree + "deg)";
      this.canvas.style.transform = rotate + this.reserveDegree;
    }
  },
  beforeDestroy() {},
  mounted() {
    this.image = new Image();
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasEventInit();
    this.image.src = "../../../static/flower.jpg";
    this.image.onload = () => {
      console.log("image.width", this.image.width);
      console.log("image.height", this.image.height);
      console.log("this.canvas.width", this.canvas.width);
      console.log("this.canvas.height", this.canvas.height);
      const position = this.getImageInitPos(this.canvas, this.image);
      console.log("position", position);
      this.imagePos = position;
      this.drawImage(this.image, this.imagePos);
    };
  }
};
</script>

<style>
#canvas-image {
  padding-top: 50px;
  width: 100%;
}
.canvas-style {
  display: block;
  /* 
  * class width height的优先级比  width height的属性优先级高 
  * 布局是先基于width,height属性进行绘制 然后再基于css width,height进行缩放
  *
  */
  width: 900px;
  /* height: 800px; */
  width: 100%;
}
</style>
