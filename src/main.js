import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery'
import 'bootstrap/js/dist/collapse';
import Vue2Storage from 'vue2-storage'
import { checkRoutes } from './auth'
import './fontawesome'
import VueCharts from 'vue-charts'
import Vuelidate from 'vuelidate'
import Toast from 'vue-easy-toast'

// You can specify the plug-in configuration when connecting, passing the second object to Vue.use
Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000
})
Vue.use(VueCharts)
Vue.use(Vuelidate)

Vue.use(Toast, {
  horizontalPosition: 'center',
  verticalPosition: 'top',
  duration: 2000,
  mode: 'queue',
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  checkRoutes(to, next)
})

new Vue({
  router,
  store,
  created () {
    // The configuration of the plugin can be changed at any time.
    // Just call the setOptions method and pass the object with the settings to it.
    this.$storage.setOptions({
      prefix: 'app_',
      driver: 'local',
      ttl: 60 * 60 * 24 * 1000
    })
  },
  render: h => h(App)
}).$mount('#app')
