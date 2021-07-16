<template>
  <div>
    <gallery :sortData="imageList" :closeOnClickModal="false" @remove="deleteImg" @update="setNewImg" >
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
      ...mapGetters(["imageList"]),
  },
  methods: {
      ...mapActions(["deleteImg", "setNewImg"]),
  }
}
</script>
<style scoped></style>
