<template>
  <div>
    <div class="modal" @click.self="clickModal">
      <div style="background-color:#f9d05c ;width:200px;height:100px;border-radius:5%">
        <div style="margin-top:10px">这是一个蒙版</div>
        <button @click="confirm" style="margin-top:10px">确定</button>
        <button @click="cancel" style="margin-top:10px">取消</button>
      </div>
    </div>
    <div style="height:800px ;background-color:#bee6fd">
      <div>这里是正常内容</div>

      <button @click="normal">甚至还有个button</button>
      <button @click="displayModal">这个button唤起蒙版</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  data() {
    return {
      modalItem: null
    };
  },
  mounted() {
    this.modalItem = document.getElementsByClassName("modal")[0];
  },
  computed: {},
  methods: {
      clickOptions(e){
          e.stopPropagation();
      },

      clickModal(e){
          console.log(`----------点击蒙版------------`);
          this.modalItem.style.display = "none";
      },
    confirm() {
      this.modalItem.style.display = "none";
      console.log("确定");
    },
    cancel() {
      console.log(`----------取消------------`);
    },
    normal() {
      console.log("诶呀--点到我了");
    },
    displayModal() {
      this.modalItem.style.display = "flex";
      console.log("唤醒");
    }
  },
  components: {}
};
</script>
<style scoped>
.modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  /* position:absolute;
  z-index: 200; */
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
