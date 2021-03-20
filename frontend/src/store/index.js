import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tickets: [],
    ticket: null,
    isSidebarOpen: false,
  },
  mutations: {
    SET_TICKETS(state, tickets) {
      state.tickets = [...tickets];
    },

    NEW_TICKET(state, ticket) {
      state.tickets.push(ticket);
    },

    SET_TICKET(state, ticket) {
      state.ticket = ticket;
    },

    DELETE_TICKET(state, id) {
      const ticketIndex = state.tickets.findIndex(
        (ticket) => ticket._id === id
      );

      if (ticketIndex === -1) return;

      state.tickets.splice(ticketIndex, 1);
    },
  },
  actions: {
    async createTicket({ commit }, ticketData) {
      const { data } = await axios.post("/create", {
        email: ticketData.email,
        title: ticketData.title,
        description: ticketData.description,
        dueDate: ticketData.dueDate,
        status: ticketData.status,
        priority: ticketData.priority,
      });

      commit("NEW_TICKET", data.newTicket);
    },

    async getTicket({ commit }, id) {
      const { data } = await axios.get(`/ticket/${id}`);

      commit("SET_TICKET", data.ticket);
    },

    async updateTicket({ commit, dispatch }, ticket) {
      await axios.patch(`/ticket/${ticket._id}`, {
        email: ticket.email,
        title: ticket.title,
        description: ticket.description,
        dueDate: ticket.dueDate,
        status: ticket.status,
        priority: ticket.priority,
      });
    },

    async getTicketList({ commit }) {
      const { data } = await axios.get("/tickets");

      commit("SET_TICKETS", data.tickets);
    },

    async deleteTicket({ commit }, id) {
      commit("DELETE_TICKET", id);

      await axios.delete(`/ticket/${id}`);
    },
  },
  getters: {
    getTicketByIdGetter: (state) => (id) =>
      state.tickets.find((ticket) => ticket._id === id),
  },
});
