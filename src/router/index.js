import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mall from '@/components/mall'
import shoppingcart from '@/components/shoppingcart'
import home from '@/components/index'
import canvasDemo from "../components/canvasDemo/canvasDemo.vue";

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
