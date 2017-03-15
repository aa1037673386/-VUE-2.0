import Vue from 'vue'
import App from './App.vue'
// import './js/size.js'
// import './css/base.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './routerConfig.js'
import stores from './store/store'
Vue.use(VueRouter);

const router=new VueRouter({
  mode: 'history', //切换路径模式，变成history模式
  scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  stores.dispatch('showLoading')  
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  stores.dispatch('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
});
Vue.prototype.$http = axios

new Vue({
  router,
  store:stores,
  el: '#app',
  render: h => h(App)
})
