import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mall from '@/components/mall'
import shoppingcart from '@/components/shoppingcart'
import home from '@/components/index'
import canvasDemo from "../components/canvasDemo/canvasDemo.vue";
import canvasDemo2 from "../components/canvasDemo/canvasDemo2.vue";
import canvasImage from "../components/canvasDemo/CanvasImage.vue";
// import thumList from "../components/Thumbnail/thumbnailList.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/canvas",
      name: "canvas",
      component: canvasDemo
    },
    {
      path: "/canvas2",
      name: "canvas2",
      component: canvasDemo2
    },
    {
      path: "/canvas-image",
      name: "canvas-image",
      component: canvasImage
    },

    // {
    //   path: "/thumList",
    //   name: "thumList",
    //   component: thumList
    // },
    {
      path: "/mall",
      name: "mall",
      // redirect:'/pay',
      component: mall
    },
    {
      path: "/pay",
      name: "shoppingcart",
      component: shoppingcart
    }
  ]
});
