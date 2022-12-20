import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import './utils/permission'
Vue.config.productionTip = false

// import permission from '@/directive/permission'

// Vue.directive('permisson',permission)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
        