import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios  from './http/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible/flexible.js'


Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$axios = axios


//前端传给后端的表单数据格式要一致为application/x-www-form-urlencoded
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
