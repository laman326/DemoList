<template>
  <div>
    <gallery
      :sortData="imageList"
      :closeOnClickModal="false"
      @remove="deleteImg"
      @update="setNewImg"
    >
      <template v-slot:headButton>
        <button>已选</button>
      </template>
      <template v-slot:dragItem='item'>
        <img  :src="item.src"  /> 
      </template>
    </gallery>
  </div>
</template>
<script>
import gallery from "../Thumbnail/components/gallery.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("imgList");
export default {
  name: "galleryDemo",
  components: {
    gallery
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["imageList"])
  },
  methods: {
    ...mapActions(["deleteImg", "setNewImg"])
  }
};
</script>
<style scoped>
img {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
</style>
