<template>
  <div>
    <el-button type="primary" @click="showModal = true"
      >Create ticket</el-button
    >

    <Modal @close="showModal = false" :show="showModal" />

    <div class="grid-container">
      <div class="grid-item">Title</div>

      <div @click="sort('status')" class="grid-item sortable">
        Status
        <i class="el-icon-sort" />
      </div>

      <div @click="sort('dueDate')" class="grid-item sortable">
        Due date

        <i class="el-icon-sort" />
      </div>
      <div @click="sort('priority')" class="grid-item sortable">
        Priority
        <i class="el-icon-sort" />
      </div>
    </div>

    <div v-for="ticket in sortedTickets" :key="ticket._id">
      <TableItem :ticket="ticket" />
    </div>

    <p>
      <el-button @click="prevPage">Previous</el-button>
      <el-button @click="nextPage">Next</el-button>
    </p>
  </div>
</template>

<script>
/* eslint-disable */

import Modal from "../components/modal.vue";
import { mapActions, mapState } from "vuex";
import TableItem from "../components/list-item";
import format from "date-fns/format";

export default {
  name: "Home",

  data: () => ({
    showModal: false,

    currentSort: "dueDate",
    currentSortDir: "asc",
    pageSize: 5,
    currentPage: 1,
  }),

  computed: {
    ...mapState(["tickets"]),

    sortedTickets() {
      return this.tickets
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },

  mounted() {
    this.getTicketList();
  },

  methods: {
    ...mapActions(["getTicketList"]),

    formatDate: (dateString) => format(new Date(dateString), "dd/LL/yy"),

    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.tickets.length)
        this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },

  components: {
    Modal,
    TableItem,
  },
};
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: center;
  justify-items: flex-start;
  grid-gap: 1rem;
}

.grid-item {
  font-weight: bold;
  padding: 1.25rem 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

.sortable {
  cursor: pointer;
}
</style>
