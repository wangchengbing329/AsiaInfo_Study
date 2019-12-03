// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bootstarpVue from 'bootstrap-vue'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import VideoPlayer from 'vue-video-player'
import "video.js/dist/video-js.css"
import "vue-video-player/src/custom-theme.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false
Vue.use(VideoPlayer)
Vue.use(bootstarpVue)
Vue.use(vueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
