<template>
  <div>
    <el-button @click="changeDirection">切换对比方向</el-button>
    <div style="posotion:relative; width: 1000px;height: 650px;">
      <canvas
        id="canvas"
        width="800"
        height="600"
        style="position: absolute;left:0px;background-color:white ;border:1px solid black"
      ></canvas>
      <div
        id="line1"
        style=" position:absolute;left:0px;width:0px;height: 600px; border:1px solid red;background-color: red;"
      ></div>
      <div
        id="line2"
        style=" position:absolute;top:0;left:0;width:800px;height: 0px; border:1px solid red;background-color: red; display:none"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "canavs",
  data() {
    return {
      newLineX: 0,
      leftDis: 0,
      topDis: 0,
      imagePosition: {},
      isMouseDown: false,
      imgScale: 1,
      canvas: null,
      cs: null,
      line: null, //实际在移动的线
      line1: null, //竖线
      line2: null, //横线
      image1: null,
      image2: null,
      canvasPosition: {}, //canvas的位置,因为canvas可能距离左上角的距离不是0
      mouseLocation: {}, //鼠标位置
      flag: false, //判断是竖线对比还是横线对比，竖线为false
      initWidth: 0, //经过自适应之后的图片宽度
      initHeight: 0
    };
  },
  mounted() {
    this.line1 = document.getElementById("line1");
    this.line2 = document.getElementById("line2");
    this.line = this.line1;
    this.init();
  },
  methods: {
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
    init() {
      this.canvas = document.getElementById("canvas");
      this.cs = this.canvas.getContext("2d");

      this.canvasPosition = this.canvas.getBoundingClientRect(); //canvas可能距离左上角的距离不是0
      //使得线的初始位置居中
      this.leftDis = this.canvas.width / 2;
      this.line1.style.left =
        this.canvas.width / 2 + this.canvasPosition.left + "px";
      this.topDis = this.canvas.height / 2 + this.canvasPosition.top;
      this.line2.style.top =
        this.canvas.height / 2 + this.canvasPosition.top + "px";

      this.image1 = new Image();
      this.image2 = new Image();
      this.image1.onload = () => {
        this.imagePosition = this.getImageInitPos(this.canvas, this.image1);
        this.drawImage();
      };
      this.image1.src = "../../static/flower.jpg";
      this.image2.onload = () => {
        this.drawImage();
      };
      this.image2.src = "../../static/营业.jpg";
      this.addEvents();
    },
    //添加所有的事件
    addEvents() {
      this.line.addEventListener(
        "mousedown",
        evt => {
          this.handleLineDown(evt);
        },
        false
      );
      //鼠标滚动
      this.canvas.addEventListener(
        "mousewheel",
        evt => {
          this.handleScroll(evt); //鼠标滚动触发
        },
        false
      );
      this.canvas.addEventListener(
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
      this.canvas.addEventListener(
        "mousemove",
        evt => {
          this.handleMouseMove(evt);
        },
        false
      );
    },

    //鼠标按下事件
    handleMouseDown(evt) {
      this.mouseLocation = this.windowToCanvas(
        this.canvas,
        evt.clientX,
        evt.clientY
      );
      this.isMouseDown = true;
    },
    // 鼠标弹起
    handleMouseUp() {
      this.canvas.style.cursor = "default";
      this.isMouseDown = false;
    },
    //鼠标移动
    handleMouseMove(event) {
      console.log("this.isMouseDown", this.isMouseDown);
      if (this.isMouseDown) {
        this.canvas.style.cursor = "move";
        let mouseLocation = this.windowToCanvas(
          this.canvas,
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
          this.canvas.style.cursor = "default";
          this.isMouseDown = false;
        }
        this.drawImage();
      }
    },
    //限制线的出界范围
    limitLine() {
      let left = this.imagePosition.x;
      let right = this.imagePosition.x + this.initWidth * this.imgScale;
      let top = this.imagePosition.y + this.canvasPosition.top;
      let bottom =
        this.imagePosition.y +
        this.canvasPosition.top +
        this.initHeight * this.imgScale;
      //如果是横线对比则返回上下，竖线对比则返回左右范围
      let min, max;
      if (this.flag) {
        min = top;
        max = bottom;
      } else {
        min = left;
        max = right;
      }
      return { min, max };
    },

    //滚轮缩放事件
    handleScroll(evt) {
      // console.log("evt", evt);
      let newMouseLocation = this.windowToCanvas(
        this.canvas,
        evt.clientX,
        evt.clientY
      );
      console.log("newMouseLocation", newMouseLocation);
      console.log("this.leftDis", this.leftDis);
      console.log("this.flag", this.flag);
      let mousex = newMouseLocation.x;
      let mousey = newMouseLocation.y;
      let delta = evt.wheelDelta / 120;
      console.log("delta", delta);
      this.imagePosition = this.zoom(mousex, mousey, delta);
      this.drawImage();
    },
    zoom(mousex, mousey, delta) {
      if (this.flag) {
        mousey = this.topDis - this.canvasPosition.top;
      } else {
        mousex = this.leftDis - this.canvasPosition.left;
      }

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

    //竖线移动事件
    handleLineDown(evt) {
      console.log(`----------进来------------`);
      let oldLinePosition;
      let newLinePosition;

      if (this.flag) {
        oldLinePosition = Number(this.line.style.top.slice(0, -2));
      } else {
        oldLinePosition = Number(this.line.style.left.slice(0, -2));
      }
      let mouseX = evt.clientX;
      let mouseY = evt.clientY;
      document.onmousemove = evt => {
        let changeX = evt.clientX - mouseX;
        let changeY = evt.clientY - mouseY;
        if (this.flag) {
          newLinePosition = this.getUpdateLinePosition(
            oldLinePosition + changeY
          );
          this.topDis = newLinePosition;
          this.line.style.top = newLinePosition + "px";
        } else {
          newLinePosition = this.getUpdateLinePosition(
            oldLinePosition + changeX
          );
          this.leftDis = newLinePosition;
          this.line.style.left = newLinePosition + "px";
        }
        this.drawImage();
      };
      document.onmouseup = function(evt) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    getUpdateLinePosition(newLinePosition) {
      let limit = this.limitLine();
      console.log("limit", limit);
      if (newLinePosition < limit.min) {
        newLinePosition = limit.min;
      }
      if (newLinePosition > limit.max) {
        newLinePosition = limit.max;
      }
      return newLinePosition;
    },

    //windowToCanvas此方法用于鼠标所在点的坐标切换到画布上的坐标
    windowToCanvas(canvas, x, y) {
      return {
        x: x - this.canvasPosition.left,
        y: y - this.canvasPosition.top
      };
    },
    // 判断是否在画布范围内
    isDivArea(point) {
      if (
        point.x < 0 ||
        point.x > this.canvas.width ||
        point.y < 0 ||
        point.y > this.canvas.height
      ) {
        return false;
      }
      return true;
    },
    //画图
    drawImage() {
      let { x, y, width, height } = this.imagePosition;
      let { cutLeft, cutHeight, useLeft, useHeight } = this.getImageParams();
      console.log(`----------来画图了吗------------`);
      //清空画布再重新画图
      this.cs.clearRect(0, 0, canvas.width, canvas.height); //在给定的矩形内清除指定的像素

      this.cs.drawImage(
        this.image1,
        x, //x
        y, //y
        width, //width
        height //height
      );
      this.cs.drawImage(
        this.image2,
        0, //sx开始裁剪的位置
        0, //sy
        cutLeft, //swidth裁剪的宽度
        cutHeight, //sheight裁剪的高度
        x, //x画布上的x坐标
        y, //Y
        useLeft, //width要使用的图像宽度
        useHeight //height要使用的图像高度
      );
    },
    //获取第二张图额外的信息，比如裁多少，用多少
    getImageParams() {
      let cutLeft = this.image2.width;
      let useLeft = this.imagePosition.width;

      let cutHeight = this.image2.height;
      let useHeight = this.imagePosition.height;

      if (this.flag) {
        //计算当前分割线相对于image的比例，并计算出相对于画布的高度。
        console.log("this.imagePosition.y", this.imagePosition.y);
        console.log("this.initHeight", this.initHeight);
        // cutHeight=this.image2.height;
        console.log("this.topDis", this.topDis);
        console.log("this.imagePosition.y", this.imagePosition.y);
        let scale =
          (this.topDis - this.imagePosition.y - this.canvasPosition.top) /
          (this.initHeight * this.imgScale);
        console.log("scale", scale);
        cutHeight = scale * this.image2.height;
        useHeight = scale * this.initHeight * this.imgScale;
      } else {
        //计算当前分割线相对于image的比例，并计算出相对于画布的宽度。
        console.log("this.canvasPosition", this.canvasPosition);
        let scale =
          (this.leftDis - this.imagePosition.x - this.canvasPosition.left) /
          (this.initWidth * this.imgScale);
        cutLeft = scale * this.image2.width;
        useLeft = scale * this.initWidth * this.imgScale;
      }
      return {
        cutLeft,
        cutHeight,
        useLeft,
        useHeight
      };
    },
    //切换对比方向
    changeDirection() {
      this.imgScale = 1;
      this.flag = !this.flag;
      if (this.flag) {
        this.line1.style.display = "none";
        this.line2.style.display = "inline";
        this.line = this.line2;
      } else {
        this.line1.style.display = "inline";
        this.line2.style.display = "none";
        this.line = this.line1;
      }
      this.init();
    }
  }
};
</script>
<style scoped></style>
