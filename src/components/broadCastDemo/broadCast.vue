<template>
  <div>
    <div class="canvasItems">
      <span v-for="imgs in imageList" :key="imgs.index" class="dragItem">
        <image-canvas :imgSrc="imgs.src" ></image-canvas>
      </span>
    </div>
  </div>
</template>
<script>
import imageCanvas from "./canvas.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("imgList");
export default {
  name: "broadCast",
  data() {
    return {
      seletedId: null
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["imageList"])
  },
  methods: {
  },
  components: { imageCanvas }
};
</script>
<style scoped></style>
