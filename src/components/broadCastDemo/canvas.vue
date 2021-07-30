<template>
    <canvas
      ref="canvas"
      width="320px"
      height="320px"
      style="border:2px solid black;margin-left:5px "
      @dblclick="changeState"
    ></canvas>
</template>
<script>
import { throttle } from "throttle-debounce";
export default {
  name: "imageCanvas",
  props: ["imgSrc"],
  data() {
    return {
      canvas: null,
      image: null,
      canvasPosition: null,
      imagePosition: {
        x: 0,
        y: 0,
        width: 300,
        height: 300
      },
      syn: true,
      mouseLocation: null,
      isMouseDown: false
    };
  },
  mounted() {
    this.id = this.imgSrc;
    this.canvas = this.$refs.canvas;
    this.cs = this.canvas.getContext("2d");
    this.canvasPosition = this.canvas.getBoundingClientRect();
    this.image = new Image();
    this.image.onload = () => {
      this.drawImage(this.image, this.cs);
    };
    this.image.src = this.imgSrc;
    this.addEvents();
    this.$bus.$on("image_handleSelect", this.handleSelect);
  },
  computed: {},
  watch:{
    syn(){
      this.changeStyle()
    }
  },
  methods: {
    handleSelect(selectedId){
      if(this.id===selectedId){
        this.syn=false
      }else{
        this.syn=true
      }
    },
    //添加所有的事件
    addEvents() {
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
        evt => {
          this.handleMouseUp(evt);
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
    drawImage() {
      let { x, y, width, height } = this.imagePosition;
      this.cs.clearRect(0, 0, 320, 320); //在给定的矩形内清除指定的像素
      this.cs.drawImage(this.image, x, y, width, height);
    },
    changeState() {
      this.syn = !this.syn;
      if(!this.syn){
        this.$bus.$emit("image_handleSelect",this.id)
      }else{
        this.$bus.$emit("image_handleSelect",null)
      }      
    },
    changeStyle(){
       if(this.syn){
        this.canvas.classList.remove('asynClass');
      }else{
        this.canvas.classList.add('asynClass')
      }
    },
    //处理广播事件
    broadCast(name, evt) {
      if (this.syn) {
        throttle(16, () => {
          if (!evt.id) {
            this.$bus.$emit("image_broadcast", {
              name: name,
              evt: Object.assign(evt, { id: this.id })
            });
          }
        })();
      }
    },
    //鼠标按下事件
    handleMouseDown(evt) {
      this.mouseLocation = this.windowToCanvas(evt);
      this.isMouseDown = true;
      this.broadCast("handleMouseDown", evt);
    },
    // 鼠标弹起
    handleMouseUp(evt) {
      this.canvas.style.cursor = "default";
      this.isMouseDown = false;
      this.broadCast("handleMouseUp", evt);
    },
    //鼠标移动
    handleMouseMove(event) {
      if (this.isMouseDown) {
        this.canvas.style.cursor = "move";
        let mouseLocation = this.windowToCanvas(event);
        if (this.isDivArea({ x: mouseLocation.x, y: mouseLocation.y })) {
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
        this.broadCast("handleMouseMove", event);
      }
    },
    //滚轮缩放事件
    handleScroll(evt) {
      let newMouseLocation = this.windowToCanvas(evt);
      let mousex = newMouseLocation.x;
      let mousey = newMouseLocation.y;
      let delta = evt.wheelDelta / 120;
      this.imagePosition = this.zoom(mousex, mousey, delta);
      this.drawImage();
      this.broadCast("handleScroll", evt);
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
    windowToCanvas(evt) {
      if (evt.id) {
        //如果有id,说明是它接收到的广播消息,则用传过来的相对位置就行
        return evt.origin;
      } else {
        //如果没有id,说明是它触发的这个事件,计算一下鼠标相对画布的位置
        let newPosition = {
          x: evt.clientX - this.canvasPosition.left,
          y: evt.clientY - this.canvasPosition.top
        };
        evt.origin = newPosition;
        return newPosition;
      }
    },
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
    }
  },
  components: {}
};
</script>
<style scoped>
.asynClass{
  border: 2px solid orangered !important;

}
</style>
