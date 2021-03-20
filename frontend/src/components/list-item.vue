<template>
  <div class="root">
    <div @click="goToTicket" class="grid-container">
      <div class="grid-item">{{ ticket.title }}</div>
      <div class="grid-item">{{ ticket.status }}</div>
      <div class="grid-item">{{ formatDate(ticket.dueDate) }}</div>
      <div class="grid-item">{{ getPriorityObj.label }}</div>

      <div>
        <el-button
          class="deleteBtn"
          @click.stop="deleteTicket(ticket._id)"
          type="danger"
          icon="el-icon-delete"
          circle
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import format from "date-fns/format";
import { PRIORITIES } from "../helpers/constants";

export default {
  props: {
    ticket: Object,
  },

  computed: {
    getPriorityObj() {
      return PRIORITIES.find((obj) => {
        return obj.value === this.ticket.priority;
      });
    },
  },

  methods: {
    ...mapActions(["closeTicket", "openTicket", "deleteTicket"]),

    formatDate: (dateString) => format(new Date(dateString), "dd/LL/yy"),

    goToTicket() {
      this.$router.push({
        name: "ticket",
        params: {
          id: this.ticket._id,
        },
      });
    },
  },
};
</script>

<style scoped>
.root {
  margin-top: 0.5rem;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: center;
  justify-items: flex-start;
  border-top: 1px solid #cfcfcf;
  grid-gap: 1rem;
  cursor: pointer;
}

.grid-container:hover {
  box-shadow: 2px 2px 10px #cfcfcf;
}

.grid-item {
  padding: 1.25rem 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

.deleteBtn {
  margin-right: 1rem;
}
</style>
