<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
export default {
  name: "canvasDemo",
  data() {
    return {
      imgX: 0, //画布X轴坐标
      imgY: 0, //画布Y轴坐标
      isMouseDown: false,
      imgScale: 1,
      image: null,
      mouseDownLocation: {},
      canvas: null,
      cs: null,
      imgSrc:'',
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.canvas = document.getElementById("canvas"); //获取画布
      console.log("this.canvas", this.canvas);
      this.cs = this.canvas.getContext("2d");
      console.log("this.cs", this.cs);
      this.image = new Image();
      //   var imgScale = 1; //当前放大倍数
      this.imgSrc= "../assets/flower.jpg";
      this.image.src=this.imgSrc;
      console.log("this.image", this.image);
      this.image.onload = function() {
        console.log(`----------jij------------`);
        this.canvas.width = this.image.width; //定位canvas宽度
        this.canvas.height = this.image.height; //定位canvas高度
        this.drawImage();
      };
      //当鼠标按下
      this.canvas.onmousedown = function(event) {
        console.log(`----------按下了------------`);
        this.mouseDownLocation = windowToCanvas(
          this.canvas,
          event.clientX,
          event.clientY
        );
        this.isMouseDown = true;
      };
      //鼠标弹起
      document.body.onmouseup = function() {
        this.canvas.style.cursor = "default";
        this.isMouseDown = false;
      };

      //鼠标移动
      this.canvas.onmousemove = function(event) {
        if (this.isMouseDown) {
          this.canvas.style.cursor = "move";
          var newMouseLocation = windowToCanvas(
            this.canvas,
            event.clientX,
            event.clientY
          );
          if (isDivArea({ x: event.clientX, y: event.clientY })) {
            var x = newMouseLocation.x - this.mouseDownLocation.x; //鼠标最新在的位置-鼠标按下时的位置
            var y = newMouseLocation.y - this.mouseDownLocation.y;
            this.mouseDownLocation = newMouseLocation; //把最新的位置赋值给鼠标按下时的位置
            imgX += x;
            imgY += y;
          } else {
            //鼠标移动至画布范围外，置鼠标弹起
            this.canvas.style.cursor = "default";
            this.isMouseDown = false;
          }

          // //限制图片拖动留白
          // if (imgScale * image.width <= canvas.width) {
          //   (imgX = 0), (imgY = 0);
          // } else {
          //   preventNull();
          // }
          drawImage();
        }
      };
    },
    handleScroll(evt) {
      console.log("evt", evt);
      var newMouseLocation = windowToCanvas(
        this.canvas,
        evt.clientX,
        evt.clientY
      );
      console.log("newMouseLocation", newMouseLocation);
      var x = newMouseLocation.x; //x是鼠标相对于画布的横坐标
      var y = newMouseLocation.y; //y是纵坐标

      if (event.deltaY > 0) {
        //鼠标滚轮放大
        this.imgScale *= 2;
        this.imgX = this.imgX * 2 - x;
        this.imgY = this.imgY * 2 - y;
      } else {
        //鼠标滚轮缩小
        this.imgScale *= 0.5;
        this.imgX = this.imgX * 0.5 + x * 0.5;
        this.imgY = this.imgY * 0.5 + y * 0.5;

        //禁止缩放留白
        // if (imgScale < 1) {
        //   imgScale = 1;
        //   imgX = 0;
        //   imgY = 0;
        // }
        // preventNull(); //防止容器留白
      }
      drawImage();
    },
    windowToCanvas(canvas, x, y) {
      var bbox = canvas.getBoundingClientRect(); //getBoundingClientRect获取元素相对于视窗的位置集合
      return {
        x: x - bbox.left - (bbox.width - canvas.width) / 2,
        y: y - bbox.top - (bbox.height - canvas.height) / 2
      };
    },
    //图片转换canvas渲染
    drawImage() {
      console.log("this.imgX,this.imgY", this.imgX, this.imgY);
      this.cs.clearRect(0, 0, this.canvas.width * 2, this.canvas.height * 2);
      this.cs.drawImage(
        this.image,
        this.imgX,
        this.imgY,
        this.image.width * this.imgScale,
        this.image.height * this.imgScale
      );
    },
    isDivArea(point) {
      if (point.x < 0 || point.x > 1280 || point.y < 0 || point.y > 853) {
        return false;
      }
      return true;
    }
  }
  // },
};
</script>
<style scoped></style>
