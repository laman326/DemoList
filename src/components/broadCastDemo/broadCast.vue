<template>
  <div>
    <div class="canvasItems">
      <span v-for="imgs in imageList" :key="imgs.index" class="dragItem">
        <image-canvas :imgSrc="imgs.src" :ref="imgs.src"></image-canvas>
      </span>
    </div>
  </div>
</template>
<script>
import imageCanvas from "./canvas.vue";
import { throttle } from "throttle-debounce";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("imgList");
export default {
  name: "broadCast",
  data() {
    return {};
  },
  mounted() {
    this.$bus.$on("image_broadcast", this.handleBroadcast);
  },
  computed: {
    ...mapGetters(["imageList"])
  },
  methods: {
    handleBroadcast(data) {
      const { name, evt } = data;
      this.imageList.forEach(item => {
        if (item.src !== evt.id) {
          let canvas = this.$refs[item.src][0];
          canvas[name](evt);
        }
      });
    }
  },
  components: { imageCanvas }
};
</script>
<style scoped></style>
