import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cadastrar from './views/Cadastrar.vue'
import Detalhe from './views/Detalhe.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*', redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout'
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: Cadastrar
    },
    {
      path: '/detalhe/:tipo/:nome',
      name: 'detalhe',
      component: Detalhe
    }
  ]
})
