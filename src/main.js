// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import{Button} from 'element-ui'
import axios from 'axios'
import store from '../src/store/index'


// import Vuex from 'vuex'
// Vue.use(Vuex)


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Button);
Vue.prototype.$ajax = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
