<template>
  <div class="home">
    <nav-principal></nav-principal>
    <main role="main">
      <introducao></introducao>
      <div class="container">
        
        <!-- Currencies -->
        <div class="row">
          <div class="col-sm-3 text-center" v-for="(item, chave) in cotacao.currencies" :key="chave">
            <div class="cotacao-content" @click.prevent="detalhe(chave, 'currencies')">
              <font-awesome-icon :icon="['fas', (item.variation <= 0 ? 'chevron-down' : 'chevron-up')]"/>&nbsp; 
              {{sources[cotacao.currencySource]}} <span>{{item.buy}}</span><br>
              <small>{{item.name}}</small>
              <p :class="(item.variation <= 0 ? 'negativo' : 'positivo')">{{item.variation}} %</p>
            </div>
          </div>
        </div>

        <!-- Bitcoins -->
        <div class="row">
          <div class="col-sm-3 text-center" v-for="(item, chave) in cotacao.bitcoins" :key="chave">
            <div class="cotacao-content" @click.prevent="detalhe(chave, 'bitcoins')">
              <font-awesome-icon :icon="['fas', (item.variation <= 0 ? 'chevron-down' : 'chevron-up')]"/>&nbsp;
              {{sources[item.format[0]]}} <span>{{item.buy}}</span><br>
              <small>{{item.name}}</small>
              <p :class="(item.variation <= 0 ? 'negativo' : 'positivo')">{{item.variation}} %</p>
            </div>
          </div>
        </div>

        <!-- Stocks -->
        <div class="row">
          <div class="col-sm-3 text-center" v-for="(item, chave) in cotacao.stocks" :key="chave">
            <div class="cotacao-content" @click.prevent="detalhe(chave, 'stocks')">
              <font-awesome-icon :icon="['fas', (item.variation <= 0 ? 'chevron-down' : 'chevron-up')]"/>&nbsp;
              <span :class="(item.variation <= 0 ? 'negativo' : 'positivo')">{{item.variation}} %</span><br>
              <small>{{item.name}}</small>
              <p>{{item.location}}</p>
            </div>
          </div>
        </div>

      </div>
    </main>  
  </div>
</template>

<script>
import NavPrincipal from '@/components/nav-principal.vue'
import Introducao from '@/components/introducao.vue'
import http from '@/service/http'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Introducao,
    NavPrincipal
  },
  data() {
    return {
      sources: {'BRL': 'R$', 'USD': '$'},
    }
  },
  computed: {
    ...mapState({
      cotacao: state => state.cotacao
    })
  },
  methods: {
    ...mapActions(['getFinance']),
    detalhe(chave, tipo) {
      this.$router.push('/detalhe/'+tipo+'/'+chave)
    }
  },
  created() {
    this.getFinance() // busca as cotações
  }
}
</script>

<style lang="scss">
@import '../styles/_home.scss'
</style>
