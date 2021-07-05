<template>
  <div class="product item" style="margin-top:1rem">
    <img src="../../static/flower.jpg" style="width:200px;height:100px" />
    <div>
      <p>{{ product.name }}</p>
      <p>{{ product.price }}元</p>
      <div v-if="!product.isShop">
        <el-button @click="add">+1</el-button>
        <p>{{ number }}</p>
        <!-- <el-button @click="del">-1</el-button> -->
      </div>
    </div>

    <el-button v-if="product.isShop" @click="addToCart"
      >加入购物车</el-button
    >
    <!-- <button @click="addToCart">加入购物车</button> -->
  </div>
</template>
<script>
import axios from "axios";
import mapGetters from 'vuex';
export default {
  name: "product",
  props: ["product"],
  data() {
    return {};
  },
  computed: {
    //   ...mapGetters('sh')
    number() {
      // return this.$store.getters.getNumber(this.product.id);
      return this.$store.getters["shop/getNumber"](this.product.id)
    }
  },
  // mounted(){
  //     this.number=this.$store.getter
  //         // axios.get('../../static/data.json').then(res=>console.log(res))
  // },
  methods: {
    addToCart() {
      console.log("加入购物车一件:",this.product.id);
      var istrue = this.$store.getters["shop/getProduct"](this.product.id)
      console.log("是否存在？", istrue);
      if (istrue) {
        this.add();
      } else {
        this.$store.commit("shop/addProduct", {
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          isShop: false,
          number: 1
        });
      }

      console.log("现在购物车里有东西了吗：", this.$store.state.shop.product);
    },
    add() {
      this.$store.dispatch("shop/increment", {
        id: this.product.id
      });
    }
  }
};
</script>

<style scoped></style>>
