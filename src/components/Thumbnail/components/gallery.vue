<template>
  <div>
    <div @click="show">
      <slot name="headButton"></slot>
    </div>
    <div class="modal" @click.self="handleWrapperClick">
      <div class="container" @animationend="disappear">
        <el-button
          size="medium"
          type="text"
          @click="clickModal"
          style="float:left;padding:0;color:black"
          ><i class="el-icon-back"></i
        ></el-button>
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
            <slot name="dragItem" :src="imgs.src"></slot>
          </div>
        </draggable>
      </div>
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
      modalItem: null,
      visibile: false
    };
  },

  computed: {
    imageList: {
      get() {
        console.log("this.sortData", this.sortData);
        return this.sortData;
      },
      set(newVal) {
        console.log("newVal", newVal);
        this.$emit("update", newVal);
      }
    }
  },
  mounted() {
    this.modalItem = document.getElementsByClassName("modal")[0];
  },
  methods: {
    isImage(str) {
      if (str.includes("jpg")) {
        return true;
      }
      return false;
    },
    handleWrapperClick() {
      console.log("this.closeOnClickModal", this.closeOnClickModal);
      if (!this.closeOnClickModal) return;
      this.clickModal();
    },
    show() {
      this.modalItem.style.display = "inline";
      let contain = document.getElementsByClassName("container")[0];
      this.modalItem.classList.remove("disappearModal");
      this.modalItem.classList.add("appearModal");
      contain.classList.remove("disappear");
      contain.classList.add("appear");
      console.log("唤醒");
    },
    clickModal(e) {
      console.log(`----------点击蒙版------------`);
      let contain = document.getElementsByClassName("container")[0];
      this.modalItem.classList.remove("appearModal");
      this.modalItem.classList.add("disappearModal");
      contain.classList.remove("appear");
      contain.classList.add("disappear");
    },
    disappear() {
      if (this.visibile === true) {
        this.modalItem.style.display = "none";
      }
      this.visibile = !this.visibile;
    }
  }
};
</script>
<style  scoped>
@keyframes changeOpacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes disappearOpacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes changeDistance {
  from {
    left: -200px;
  }
  to {
    left: 0px;
  }
}

@keyframes disappear {
  from {
    left: 0;
  }
  to {
    left: -200px;
  }
}
.appearModal {
  animation-name: changeOpacity;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
.disappearModal {
  animation-name: disappearOpacity;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
.appear {
  animation-name: changeDistance;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
.disappear {
  animation-name: disappear;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
.container {
  background-color: #f1f0ed;
  position: absolute;
  width: 200px;
  height: 100%;
  left: -200px;
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
video {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
.modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  z-index: 10;
}
</style>
