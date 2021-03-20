<template>
  <div>
    <div :class="$style.homeButton">
      <router-link to="/">Home</router-link>
    </div>

    <h1>Edit your ticket</h1>
    <h2>Email</h2>
    <EditComp
      :class="$style.inputName"
      :value="ticket.email"
      @submit="submit"
      @input="updatedEmail = $event"
    />

    <h2>Title</h2>
    <EditComp
      :class="$style.inputName"
      :value="ticket.title"
      @submit="submit"
      @input="updatedTitle = $event"
    />

    <h2>Description</h2>
    <EditComp
      :class="$style.inputName"
      :value="ticket.description"
      @submit="submit"
      @input="updatedDescription = $event"
    />

    <h2>Due date</h2>
    <el-date-picker
      v-model="dueDate"
      type="date"
      placeholder="Due date"
      @change="submit"
    ></el-date-picker>

    <h2>Priority</h2>
    <el-select
      v-model="priority"
      @change="submit"
      placeholder="Change priority"
    >
      <el-option
        v-for="priority in PRIORITIES"
        :key="priority.value"
        :label="priority.label"
        :value="priority.value"
      ></el-option>
    </el-select>

    <h2>Status</h2>
    <el-select v-model="status" @change="submit" placeholder="Change status">
      <el-option
        v-for="status in STATUSES"
        :key="status.value"
        :label="status.label"
        :value="status.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { format } from "date-fns";
import { mapActions, mapState, mapGetters } from "vuex";
import EditComp from "../components/input-edit";
import { PRIORITIES, STATUSES } from "../helpers/constants";

export default {
  data: () => ({
    updatedEmail: "",
    updatedTitle: "",
    updatedDescription: "",
    dueDate: "",
    priority: null,
    status: null,
  }),

  computed: {
    ...mapState(["ticket"]),

    PRIORITIES: () => PRIORITIES,
    STATUSES: () => STATUSES,

    ticketId() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    await this.getTicket(this.ticketId);
  },

  methods: {
    formatDate: (date) => format(new Date(date), "dd MMM yyyy"),

    ...mapActions(["getTicket", "updateTicket"]),

    async submit() {
      const updateTicketData = {
        _id: this.ticketId,
        email: this.updatedEmail,
        title: this.updatedTitle,
        description: this.updatedDescription,
        dueDate: this.dueDate,
        priority: this.priority,
        status: this.status,
      };
      await this.updateTicket(updateTicketData);
    },

    // async _closeTicket() {
    //   this.closeTicket({ id: this.ticketId });
    // },

    // async _openticket() {
    //   this.openticket({ id: this.ticketId });
    // }
  },

  components: {
    EditComp,
    // EditTextAreaComp,
  },
};
</script>

<style module lang="scss">
.inputName {
  input {
    font-size: 1rem !important ;
  }

  input:not(:focus :hover) {
    background: none !important;
    border: 1px solid transparent;
  }
}

.homeButton {
  margin-bottom: 1rem;
}
</style>
