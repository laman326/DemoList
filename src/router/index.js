import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mall from '@/components/mall'
import shoppingcart from '@/components/shoppingcart'
import home from '@/components/index'
import canvasDemo from "../components/canvasDemo/canvasDemo.vue";
import canvasDemo2 from "../components/canvasDemo/canvasDemo2.vue";
import canvasImage from "../components/canvasDemo/CanvasImage.vue";
import swiper from "../components/Thumbnail/swiper.vue"
import dragDemo from "../components/Thumbnail/draggableDemo.vue"
import modal from "../components/Thumbnail/modal.vue"
import dragModal from "../components/Thumbnail/dragModal.vue"
import galleryDemo from "../components/Thumbnail/galleryDemo.vue"

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

    {
      path: "/swiper",
      name: "swiper",
      component: swiper
    },
    {
      path: "/drag-demo",
      name: "dragDemo",
      component: dragDemo
    },
    {
      path: "/modal",
      name: "modal",
      component: modal
    },
    {
      path: "/dragModal",
      name: "dragModal",
      component: dragModal
    },
    {
      path: "/galleryDemo",
      name: "galleryDemo",
      component: galleryDemo
    },

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
