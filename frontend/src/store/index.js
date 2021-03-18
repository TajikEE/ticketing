import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
   async createTicket({ commit }, ticketData) {
      await axios.post('/create', {
        title: ticketData.title,
        description: ticketData.description,
        dueDate: ticketData.dueDate,
        status: ticketData.status,
        priority: ticketData.priority,
      })
    }
  },
  modules: {}
});
