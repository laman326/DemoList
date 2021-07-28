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
      <canvas id="cs1" width="300px" height="300px"></canvas>
      <canvas id="cs2" width="300px" height="300px"></canvas>
      <canvas id="cs3" width="300px" height="300px"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  name: "rotate",
  data() {
    return {
      degree: 0,
      reserveDegree: "scaleX(1) scaleY(1)",
      image1: null,
      image2: null,
      canvas1: null,
      canvas2: null,
      cs1: null,
      cs2: null,
      scaleX: 1,
      scaleY: 1
    };
  },
  mounted() {
    this.canvas1 = document.getElementById("cs1");
    // console.log('this.canvas1.width',this.canvas1.width);
    this.cs1 = this.canvas1.getContext("2d");
    this.canvas2 = document.getElementById("cs2");
    this.cs2 = this.canvas2.getContext("2d");
    this.canvas3 = document.getElementById("cs2");
    this.cs3 = this.canvas3.getContext("2d");

    this.image1 = new Image();
    this.image2 = new Image();

    this.image1.onload = () => {
      this.drawImage(this.image1, this.cs1);
    };
    this.image1.src = "../../../static/flower.jpg";
    //   this.image2.onload = () => {
    //     this.drawImage(this.image2, this.cs2);
    //   };
    //   this.image2.src = "../../../static/营业.jpg";
  },
  computed: {},
  methods: {
    rotate(degree) {
      this.degree += degree;
      this.degree = this.degree % 360;
      console.log("current", this.degree);
      this.transform();
    },
    drawImage(image, cs) {
      cs.clearRect(0, 0, 300, 300); //在给定的矩形内清除指定的像素
      cs.drawImage(
        image,
        0, //x
        0, //y
        300, //width
        300 //height
      );
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
      this.canvas1.style.transform = rotate + this.reserveDegree;
    }
  },
  components: {}
};
</script>
<style scoped>
#cs1 {
  /* transform: rotate(180deg) scaleY(-1); */
}
</style>
