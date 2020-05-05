<template>
  <div class="login container text-center">
    <div class="row">
        <div class="col align-self-center">
            <div class="card border-light">
                <div class="card-header">
                <h5>
                    Entre e verifique as cotações
                </h5>
                </div>
                <div class="card-body">
                    <form class="form-mini" @submit.prevent="doLogin" novalidate>
                        <div class="form-group" :class="{ 'form-group--error': ($v.login.$dirty && $v.login.$invalid) }">
                            <label for="login" class="sr-only">login</label>
                            <input type="text" v-model="login" @input="$v.login.$touch()" id="login" class="form-control" placeholder="Login" autofocus="">
                            <span class="error" v-if="$v.login.$dirty && !$v.login.required">Login é obrigatório</span>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': ($v.senha.$dirty && $v.senha.$invalid) }">
                            <label for="senha" class="sr-only">Senha</label>
                            <input type="password" v-model="senha" @input="$v.senha.$touch()" id="senha" class="form-control" placeholder="Senha">
                            <span class="error" v-if="$v.senha.$dirty && !$v.senha.required">Senha é obrigatório</span>
                        </div>
                        <div class="form-group">
                          <button class="btn btn-success btn-block" type="submit" :disabled="!isWholeModelValid">Logar</button>
                        </div>
                        <div>
                            <small class="form-text text-muted text-left">
                                <router-link class="" to="/cadastrar">Ir para o cadastro</router-link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import http from '@/service/http'
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data() {
    return {
      login: '',
      senha: ''
    }
  },
  validations: {
    login: {
        required
    },
    senha: {
        required
    }
  },
  computed: {
      isWholeModelValid () {
          return !this.$v.$invalid
      },
  },
  methods: {
    async doLogin() {
      if (this.$v.$invalid) {
        this.$toast('Dados inválidos e/ou incompletos.', {
          className: ['error-msg']
        })
      } else {
        // dados do localstorage 
        const ls_login = this.$storage.get('login', false)
        const ls_senha = this.$storage.get('senha', false)
        // confere se existe o usuário cadastrado
        if (ls_login && ls_senha) {
          // busca os dados informados
          const {login, senha} = this
          // conferindo os dados informados
          if (ls_login.key == login && ls_senha.key == senha) {
            this.$toast('Bem vindo ao Blueticket!', {
              className: ['success-msg']
            })
            // vue-storage
            this.$storage.set('isLogged', { key: true }, { ttl: 60 * 1000 * 60 }) // 1 hora
            this.$router.push('/') // home
          } else {
            this.$toast('Login e/ou senha inválidos.', {
              className: ['info-msg']
            })
          }
        } else {
          this.$toast('Usuário não cadastrado no sistema.', {
            className: ['info-msg']
          })
        }
      }
    },
  },
  mounted() {
    console.log('Login', process.env.VUE_APP_API_HG)
  }
}
</script>

<style lang="scss">
@import "../styles/_login.scss";
</style>