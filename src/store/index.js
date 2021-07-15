import Vue from "vue";
import Vuex from "vuex";
import shoppingcart from "./module/shoppingcartList";
import mallList from "./module/mallList";
import imageList from "./module/imageList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shop: shoppingcart,
    mall: mallList,
    imgList: imageList
  }
});

