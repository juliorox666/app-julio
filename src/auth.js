import Vue from 'vue'
import store from '@/store'

const isAuth = () => {
    // dados do localstorage 
    const isLogged = Vue.$storage.get('isLogged', false)
    return (isLogged === false ? false : isLogged.key)
}

const tempoExpirou = () => {
    Vue.toast('Tempo de acesso expirado.', {
        className: ['info-msg']
    })
}

const logOut = () => {
    store.dispatch('clearSettimeout')
    Vue.$storage.remove('isLogged')
    // window.location.href="/"
}

const checkRoutes = (to, next) => {
    // auth = ok!
    if (isAuth()) {
        if (to.name === 'home' || to.name === 'detalhe') {
            next()
        } else if (to.name == 'login' || to.name == 'cadastrar') {
            next('/')
        } else if (to.name == 'logout') {
            logOut()
            next('/login')
        }
    } else {
        // auth = Denied!
        if (to.name === 'home' || to.name === 'detalhe') {
            logOut()
            next('/login')
        } else if (to.name == 'login' || to.name == 'cadastrar') {
            next()
        } else if (to.name == 'logout') {
            logOut()
            next('/login')
        }
    }
}

export {
    isAuth,
    logOut,
    tempoExpirou,
    checkRoutes,
}