import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mall from '../components/VuexDemo-mall/mall.vue'
import shoppingcart from '@/components/VuexDemo-mall/shoppingcart.vue'
import home from '@/components/index' 
import canvasDemo from "../components/canvasDemo/canvasDemo.vue";
import canvasImage from "../components/canvasDemo/CanvasImage.vue";
import swiper from "../components/Thumbnail/swiper.vue"
import dragDemo from "../components/Thumbnail/draggableDemo.vue"
import modal from "../components/Thumbnail/modal.vue"
import dragModal from "../components/Thumbnail/dragModal.vue"
import galleryDemo from "../components/Thumbnail/galleryDemo.vue"
import rotate from "../components/canvasRotate/rotate.vue"
import broadCast from "../components/broadCastDemo/broadCast.vue"
import rotateWithBitMap from "../components/canvasRotate/rotateWithBitMap.vue"
import testOffsrceern from "../components/canvasRotate/canvasExample.vue";
import cutImageToDrawCanvas from "../components/canvasRotate/cutImageToDrawCanvas.vue"
import GifDemo from "../components/gifDemo/gif.vue"
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
      path: "/rotate",
      name: "rotate",
      component: rotate
    },
    {
      path: "/broadCast",
      name: "broadCast",
      component: broadCast
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
    },
    {
      path: "/rotateWithBitMap",
      name: "rotateWithBitMap",
      component: rotateWithBitMap
    },
    {
      path: "/testOffsrceern",
      name: "testOffsrceern",
      component: testOffsrceern
    },
    {
      path: "/cutImageToDrawCanvas",
      name: "cutImageToDrawCanvas",
      component: cutImageToDrawCanvas
    },
    {
      path: "/GifDemo",
      name: "GifDemo",
      component: GifDemo
    }
  ]
});
