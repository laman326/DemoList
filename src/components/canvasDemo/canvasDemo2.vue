<template>
  <div>
    <!-- <el-button @click="changeDirection">切换对比方向</el-button> -->
    <div
      style="background-color:rgba(43, 189, 226, 0.877); position: relative;"
    >
      <canvas
        id="canvas"
        style="position: absolute; top: 0; left:0; bottom: 0; right: 0; margin: auto;"
      ></canvas>
      <!-- <div
        id="line1"
        style=" position:absolute;left:0;width:0px;height: 900px; border:2px solid red;background-color: red;"
      ></div> -->
      <div
        id="line2"
        style=" position:absolute;top:0;left:0;width:1300px;height: 0px; border:2px solid red;background-color: red;"
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
      topDis:0,
      lineLeft: 0, //线不出界的范围
      lineRight: 1280,
      lineTop:0,
      lineBottom:853,
      imgX: 0,
      imgY: 0,
      isMouseDown: false,
      imgScale: 1,
      canvas: null,
      cs: null,
      line: null,
      line1: null,
      line2: null,
      image1: null,
      image2: null,
      lineX: 0, //线的实时位置
      lineY: 0,
      newLineX: 0,
      newLineY: 0,
      mouseDownLocation: {},
      newMouseLocation: {},
      flag: false, //判断是竖线对比还是横线对比，竖线为false
      factor: 1 //单次缩放系数
    };
  },
  mounted() {
    this.line1 = document.getElementById("line1");
    this.line2 = document.getElementById("line2");
    this.line = this.line2;
    this.init();
  },
  methods: {
    init() {
      this.canvas = document.getElementById("canvas"); //获取画布
      this.cs = canvas.getContext("2d");
      this.image1 = new Image();
      this.image2 = new Image();

      console.log("this.line", this.line);

      this.image1.onload = () => {
        this.canvas.width = this.image1.width;
        this.canvas.height = this.image1.height;
        this.drawImage();
      };
      this.image1.src = "../../static/flower.jpg";

      this.image2.onload = () => {
        this.drawImage();
      };
      this.image2.src = "../../static/营业.jpg";

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
      this.mouseDownLocation = this.windowToCanvas(
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
        this.newMouseLocation = this.windowToCanvas(
          this.canvas,
          event.clientX,
          event.clientY
        );
        if (this.isDivArea({ x: event.clientX, y: event.clientY })) {
          var x = this.newMouseLocation.x - this.mouseDownLocation.x; //鼠标最新在的位置-鼠标按下时的位置
          var y = this.newMouseLocation.y - this.mouseDownLocation.y;
          this.mouseDownLocation = this.newMouseLocation; //把最新的位置赋值给鼠标按下时的位置
          this.imgX += x;
          this.imgY += y;
          this.lineLeft = this.imgX;
          this.lineRight = this.imgX + this.image1.width * this.imgScale;
        } else {
          //鼠标移动至画布范围外，置鼠标弹起
          this.canvas.style.cursor = "default";
          this.isMouseDown = false;
        }
        this.drawImage();
      }
    },

    //滚轮缩放事件
    handleScroll(evt) {
      // console.log("evt", evt);
      var newMouseLocation = this.windowToCanvas(
        this.canvas,
        evt.clientX,
        evt.clientY
      );
      console.log("newMouseLocation", newMouseLocation);
      console.log("this.leftDis", this.leftDis);
    //   var x = this.leftDis;

      var x = newMouseLocation.x; //x是鼠标相对于画布的横坐标
      var y=this.topDis;
    //   var y = newMouseLocation.y; //y是纵坐标
      // var y=leftDis;
      var delta = evt.wheelDelta
        ? evt.wheelDelta / 80
        : evt.detail
        ? -evt.detail
        : 0;
      this.cs.translate(x,y)
      this.factor = Math.pow(1.1, delta);
      this.imgScale *= this.factor;
      this.cs.scale(this.factor, this.factor);

      this.cs.translate(-x, -y);
      this.drawImage();

      var bbox = this.canvas.getBoundingClientRect(); //getBoundingClientRect获取元素相对于视窗的位置集合
      console.log("bbox", bbox);

    //   if (event.deltaY > 0) {
    //     //鼠标滚轮放大
    //     this.imgScale *= 2;
    //     this.imgX = this.imgX * 2 - x;
    //     this.imgY = this.imgY * 2 - y;
    //     this.lineLeft = this.imgX;
    //     this.lineRight = this.imgX + this.image1.width ;
    //   } else {
    //     //鼠标滚轮缩小
    //     this.imgScale *= 0.5;
    //     this.imgX = this.imgX * 0.5 + x * 0.5;
    //     this.imgY = this.imgY * 0.5 + y * 0.5;
    //     this.lineLeft = this.imgX;
    //     this.lineRight = this.imgX + this.image1.width * this.imgScale;
    //   }
    //   this.drawImage();
    },

    //竖线移动事件
    handleLineDown(evt) {
      console.log(`----------进来------------`);

      this.lineY = Number(this.line.style.top.slice(0, -2));

      var mouseY = evt.clientY;
      document.onmousemove = evt => {
        var changeY = evt.clientY - mouseY;
        this.newLineY = this.lineY + changeY;

        if (this.newLineY < this.lineTop) {
          this.newLineY = this.lineTop;
        }
        if (this.newLineY > this.lineBottom) {
          this.newLineY = this.lineBottom;
        }
        this.topDis = this.newLineY;
        this.line.style.top = this.newLineY + "px";
        this.drawImage();
      };
      document.onmouseup = function(evt) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    //windowToCanvas此方法用于鼠标所在点的坐标切换到画布上的坐标
    windowToCanvas(canvas, x, y) {
      var bbox = canvas.getBoundingClientRect(); //getBoundingClientRect获取元素相对于视窗的位置集合
      // console.log("bbox", bbox);
      return {
        x: x - bbox.left - (bbox.width - canvas.width) / 2,
        y: y - bbox.top - (bbox.height - canvas.height) / 2
      };
    },
    // 判断是否在画布范围内
    isDivArea(point) {
      if (point.x < 0 || point.x > 1280 || point.y < 0 || point.y > 853) {
        return false;
      }
      return true;
    },
    //画图
    drawImage() {
      console.log("this.imgX,this.imgY", this.imgX, this.imgY);
      // this.cs.clearRect(0, 0, canvas.width * 2, canvas.height * 2); //在给定的矩形内清除指定的像素

      // 保存当前渲染上下文所进行的变换
      this.cs.save();

      // 重置渲染上下文并清空画布
      this.cs.setTransform(1, 0, 0, 1, 0, 0);
      this.cs.clearRect(0, 0, canvas.width, canvas.height);

      // 恢复先前渲染上下文所进行的变换
      this.cs.restore();

      this.cs.drawImage(
        this.image1,
        this.imgX, //x
        this.imgY, //y
        this.image1.width, //width
        this.image1.height //height
      );
      var drawLeft =
        ((this.leftDis / this.imgScale - this.imgX) / (this.image2.width*this.imgScale)) *
        this.canvas.width; //计算当前分割线相对于image的比例，并计算出相对于画布的宽度。
      this.cs.drawImage(
        this.image2,
        0, //sx开始裁剪的位置
        0, //sy
        this.image2.width, //swidth裁剪的宽度
        this.topDis, //sheight裁剪的高度
        this.imgX, //x画布上的x坐标
        this.imgY, //Y
        this.image2.width, //width要使用的图像宽度
        // image2.width * imgScale,
        this.topDis //height要使用的图像高度
      );
    },
    //切换对比方向
    changeDirection() {
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
