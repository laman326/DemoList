<template>
  <div>
    <el-button type="text" @click="generateGIF" id="btnDownload"
      >生成gif</el-button
    >
    <img
      src="../../../static/snow/anim1.jpg"
      width="300px"
      height="300"
      id="image1"
    />
    <img
      src="../../../static/snow/anim2.jpg"
      width="300px"
      height="300"
      id="image2"
    />
    <el-dialog
      id="dialog"
      title="gif"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div id="container">
        <div id="msg">正在生成gif请稍后...</div>
        <img
          src="../../../static/loading.gif"
          id="result"
          width="400"
          height="300"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GIF from "@dhdbstjr98/gif.js";
export default {
  name: "gif",
  components: {},
  data() {
    return {
      dialogVisible: false,
      gif: null
    };
  },
  mounted() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      const btnDownload = document.getElementById("btnDownload");
      this.gif = new GIF({
        workers: 4,
        workerScript: "/gif.worker.js",
        quality: 1,
        repeat: 0,
        width: 600,
        height: 392
        // dither:'Stucki'
      });

      let image1 = document.getElementById("image1");
      let image2 = document.getElementById("image2");

      // let image3 = new Image();
      // image3.src = "../../../static/snow/anim3.jpg";
    
      this.gif.addFrame(image1,{delay:1000});
      this.gif.addFrame(image2,{delay:1000});
      // this.gif.addFrame(image3,{delay:200});

    },
    generateGIF() {
      this.dialogVisible = true;
      this.gif.on("finished", (blob)=> {
        //根据内容生成gif文件，展示在result中
        var file = new FileReader();
        file.readAsDataURL(blob);
        file.onload = function() {
          document.getElementById("result").setAttribute("src", file.result);
        };

        //提供下载按钮
        let container = document.getElementById("container");
        let msg = document.getElementById("msg");
        msg.innerText = "gif预览";
        console.log("blob", blob);
        const a = document.createElement("a");
        a.innerText = "下载gif";
        container.append(a);
        // a.srcObject=blob;

        a.href = URL.createObjectURL(blob);
        a.download = "canvas-image.gif";
        // a.click();
        this.gif.freeWorkers.forEach(w => w.terminate());
        this.gif.abort()
      });
      this.gif.render();
    }
  }
};
</script>
<style scoped></style>
