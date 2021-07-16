<template>
  <div class="modal" @click.self="handleWrapperClick">
    <div class="container" >
      <el-button size="medium" type="text" @click="clickModal" style="float:left;padding:0;color:black"
        ><i class="el-icon-back" ></i></el-button
      >
      <draggable v-model="imageList" id="drag">
        <div v-for="imgs in imageList" :key="imgs.index" class="dragItem">
          <div class="close">
            <span>{{ imgs.title }}</span>
            <span
              @click="$emit('remove', imgs)"
              title="close this item"
              style="float:right"
            >
              <i class="el-icon-close"></i>
            </span>
          </div>
          <img :src="imgs.src" :alt="imgs.title" />
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "gallery",
  components: { draggable },
  props: {
    sortData: {
      type: Array,
      required: true,
      default: () => []
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      modalItem: null
    };
  },

  computed: {
    imageList: {
      get() {
        return this.sortData;
      },
      set(newVal) {
        this.$emit("update", newVal);
      }
    }
  },
  mounted() {
    this.modalItem = document.getElementsByClassName("modal")[0];
  },
  methods: {
    // ...mapActions(["deleteImg", "setNewImg"]),
    clickOptions(e) {
      e.stopPropagation();
    },
    handleWrapperClick() {
      console.log(`----------进来了------------`);
      console.log("this.closeOnClickModal", this.closeOnClickModal);
      if (!this.closeOnClickModal) return;
      this.clickModal();
    },

    clickModal(e) {
      console.log(`----------点击蒙版------------`);
      this.modalItem.style.display = "none";
    },
    displayModal() {
      this.modalItem.style.display = "inline";
      console.log("唤醒");
    }
  }
};
</script>
<style scoped>
.container {
  background-color: #f9d05c;
  width: 200px;
  height: 100%;
  border: 1px solid;
}
.dragItem {
  margin-top: 10px;
}

#drag {
  float: left;
  height: 920px;
  padding: 0;
  overflow: auto;
}
#drag::-webkit-scrollbar {
  display: none;
}
img {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
.modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
