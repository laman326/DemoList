<template>
  <div class="shoppingcart">
    <h3>{{ msg }}</h3>
    <div v-if="isEmpty === 0">您的购物车空空如也</div>
    <div v-else>您的购物车目前有{{ isEmpty }}件商品,共计{{ totalPrice }}元</div>

    <products
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></products>
    <el-button @click="goback">返回选购</el-button>
    <!-- <el-input type="file" value="hhh"> -->
    <el-input type="file" label="shi"></el-input>
    <el-button class="btn btn-theme" onclick="upload.click()">你好</el-button>
    <input type="file" name="upload" id="upload" @click="test" style="display: none;" />
 
    <!-- {{}} -->
  </div>
</template>
<script>
import products from "./products";
// import { mapGetters } from 'vuex'
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("shop");
export default {
  name: "shoppingcart",
  components: {
    products
  },
  data() {
    return {
      msg: "购物车",

      // isEmpty:this.$store.getters.findCartLength,
      products: this.$store.state.shop.product
      // price:this.$store.getters.totalPrice,
    };
  },
  computed: {
    ...mapGetters({
      isEmpty: "findCartLength",
      totalPrice: "totalPrice"
    })
    // isEmpty(){
    //     return this.$store.getters.findCartLength;
    // },
    // price(){
    //     return this.$store.getters.totalPrice;
    // }
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    test(){
        console.log('来个输出')
    },
    getFile() {
      const filters = [{ name: "python", extensions: ["py"] }];
      dialog
        .showOpenDialog({
          title: "add file",
          properties: ["openFile", "multiSelections"],
          filters: filters
        })
        .then(({ canceled, filePaths }) => {
          if (canceled || !filePaths || !(filePaths.length > 0)) {
            return;
          }
          const filePath = filePaths[0];
          this.setCurrentViewer(filePath);
          this.addHistoryViewers(filePaths);
        });
    }
  }
};
</script>

<style scoped></style>>
