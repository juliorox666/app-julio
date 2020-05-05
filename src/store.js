import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/service/http'
import { isAuth } from '@/auth'

Vue.use(Vuex)

const getFinance = async ({ commit, state }) => {
  const key = process.env.VUE_APP_HG_KEY;
  const response = await http.get('/finance?format=json-cors&key='+key)
  
  if (response.status === 200) {

      const results = response.data.results;

      const cotacao = {
        created_at: {},
        currencySource: '',
        currencies: {},
        bitcoins: {},
        stocks: {},
      }

      cotacao.created_at = new Date()

      // Currencies
      cotacao.currencySource = results.currencies.source
      cotacao.currencies['USD'] = results.currencies.USD
      cotacao.currencies['EUR'] = results.currencies.EUR
      cotacao.currencies['GBP'] = results.currencies.GBP
      cotacao.currencies['ARS'] = results.currencies.ARS
      
      // Bitcoin
      cotacao.bitcoins['blockchain_info'] = results.bitcoin.blockchain_info
      cotacao.bitcoins['bitstamp'] = results.bitcoin.bitstamp
      cotacao.bitcoins['omnitrade'] = results.bitcoin.omnitrade
      cotacao.bitcoins['mercadobitcoin'] = results.bitcoin.mercadobitcoin

      // Stocks
      cotacao.stocks['NASDAQ'] = results.stocks.NASDAQ
      cotacao.stocks['IBOVESPA'] = results.stocks.IBOVESPA

      // salva cotação por hora
      commit('SET_COTACAO', cotacao)
      
      if (isAuth()) {
        const stt = setTimeout(() => {
          getFinance({commit, state}) // busca as cotações
        }, process.env.VUE_APP_TIME);

        commit('SET_TIMEOUT', stt)
      } else {
        clearTimeout(state.settimeoutInstance);
      }

  }
};

export default new Vuex.Store({
  state: {
    settimeoutInstance: null,
    aCotacoes: [],
    hasData: false,
    cotacao: {
      created_at: {},
      currencySource: '',
      currencies: {},
      bitcoins: {},
      stocks: {},
    }
  },
  mutations: {
    SET_COTACAO (state, obj) {
      state.cotacao = obj
      state.aCotacoes.push(state.cotacao)
      state.hasData = true
    },
    CLEAR_COTACAO (state) {
      state.cotacao.created_at = {}
      state.cotacao.currencySource = ''
      state.cotacao.currencies = {}
      state.cotacao.bitcoins = {}
      state.cotacao.stocks = {}
    },
    SET_TIMEOUT (state, stt) {
      clearTimeout(state.settimeoutInstance);
      state.settimeoutInstance = stt
    },
    CLEAR_TIMEOUT (state) {
      clearTimeout(state.settimeoutInstance);
    }
  },
  actions: {
    setCotacao ({ commit }, obj) {
      commit('SET_COTACAO', obj)
    },
    clearCotacao ({ commit }) {
      commit('CLEAR_COTACAO')
    },
    setarSettimeout({commit}, stt) {
      commit('SET_TIMEOUT', stt)
    },
    clearSettimeout({commit}) {
      commit('CLEAR_TIMEOUT')
    },
    getFinance,
  },
})
