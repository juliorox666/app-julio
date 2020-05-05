<template>
    <div class="cadastro container text-center">
        <div class="row">
            <div class="col align-self-center">
                <div class="card border-light">
                    <div class="card-header">
                    <h5>
                        Cadastro
                    </h5>
                    </div>
                    <div class="card-body">
                        <form class="form-mini" @submit.prevent="register" novalidate>
                            <div class="form-group" :class="{ 'form-group--error': ($v.login.$dirty && $v.login.$invalid) }">
                                <label for="login" class="sr-only">login</label>
                                <input type="text" v-model="login" @input="$v.login.$touch()" id="login" class="form-control" placeholder="Login" autofocus="">
                                <span class="error" v-if="$v.login.$dirty && !$v.login.required">Login é obrigatório</span>
                                <span class="error" v-if="$v.login.$dirty && !$v.login.minLength">O login deve ter no mínimo {{$v.login.$params.minLength.min}} caracteres.</span>
                            </div>
                            <div class="form-group" :class="{ 'form-group--error': ($v.senha.$dirty && $v.senha.$invalid) }">
                                <label for="senha" class="sr-only">Senha</label>
                                <input type="password" v-model="senha" @input="$v.senha.$touch()" id="senha" class="form-control" placeholder="Senha">
                                <span class="error" v-if="$v.senha.$dirty && !$v.senha.required">Senha é obrigatório</span>
                                <span class="error" v-if="$v.senha.$dirty && !$v.senha.minLength">A senha deve ter no mínimo {{$v.senha.$params.minLength.min}} caracteres.</span>
                            </div>
                            <div class="form-group" :class="{ 'form-group--error': ($v.senhaConfirma.$dirty && !$v.senhaConfirma.sameAsSenha) }">
                                <label for="senhaConfirma" class="sr-only">Confirmar senha</label>
                                <input type="password" v-model="senhaConfirma" @input="$v.senhaConfirma.$touch()" id="senhaConfirma" class="form-control" placeholder="Confirmar senha">
                                <span class="error" v-if="$v.senhaConfirma.$dirty && !$v.senhaConfirma.sameAsSenha">Senhas não estão iguais.</span>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block" type="submit" :disabled="!isWholeModelValid">Cadastrar</button>
                            <button class="btn btn-danger btn-block" type="button" @click.prevent="limpaDados">Limpar</button>
                            </div>
                            <div>
                                <small class="form-text text-muted text-left">
                                    <router-link class="" to="/login">Ir para o login</router-link>
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Cadastrar',
    data() {
        return {
            login: '',
            senha: '',
            senhaConfirma: '',
        }
    },
    validations: {
        login: {
            required,
            minLength: minLength(4)
        },
        senha: {
            required,
            minLength: minLength(4)
        },
        senhaConfirma: {
            sameAsSenha: sameAs('senha')
        }
    },
    computed: {
        isWholeModelValid () {
            return !this.$v.$invalid
        },
    },
    methods: {
        limpaDados() {
            this.login = '';
            this.senha = '';
            this.senhaConfirma = '';
            this.$v.$reset()
        },
        async register () {
            if (this.$v.$invalid) {
                this.$toast('Dados inválidos e/ou incompletos.', {
                    className: ['error-msg']
                })
            } else {
                this.$toast('Usuário cadastrado com sucesso!!', {
                    className: ['success-msg']
                })
                const {login, senha} = this
                // vue-storage
                this.$storage.set('login', { key: login }, { ttl: 60 * 1000 * 60 }) // 1 hora
                this.$storage.set('senha', { key: senha }, { ttl: 60 * 1000 * 60 }) // 1 hora
                this.$router.push('/')
            }
        }
    },
    mounted() {
        // console.log(this.$v.$invalid)
    }
}
</script>

<style lang="scss">
@import "../styles/_cadastrar.scss";
</style>