import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencies: {}
  },
  mutations: {
    SET_CURRENCY_LIST(state, payload) {
      state.currencies = payload
    }
  },
  actions: {
    async fetchCurrencies() {
      return await this._vm.$axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res => {
          this.commit('SET_CURRENCY_LIST', res.data)
        })
        .catch(error => {
          console.error(error);
        })
    }
  },
  modules: {
  }
})
