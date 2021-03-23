<template>
  <transition name="modal">
    <div v-if="show" :class="$style.mask" @click="close">
      <div :class="$style.container" class="modal-container" @click.stop>
        <div :class="$style.header">
          Create a ticket
        </div>

        <button :class="$style.close" @click="close">
          X
        </button>

        <el-alert v-if="error" :title="error" type="error"> </el-alert>

        <el-form>
          <el-form-item>
            <label>Email</label>
            <el-input v-model="email" placeholder="Email"></el-input>
          </el-form-item>

          <el-form-item>
            <label>Title</label>
            <el-input v-model="title" placeholder="Title"></el-input>
          </el-form-item>

          <el-form-item>
            <label>Description</label>
            <el-input
              type="textarea"
              v-model="description"
              placeholder="Description"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <label>Priority</label>
            <div>
              <el-select v-model="priority" placeholder="Choose a priority">
                <el-option
                  v-for="priority in PRIORITIES"
                  :key="priority.value"
                  :label="priority.label"
                  :value="priority.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item>
            <label>Status</label>
            <div>
              <el-select v-model="status" placeholder="Choose a status">
                <el-option
                  v-for="status in STATUSES"
                  :key="status.value"
                  :label="status.label"
                  :value="status.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item>
            <label>Due date</label>
            <div>
              <el-date-picker
                v-model="dueDate"
                type="date"
                placeholder="Due date"
              ></el-date-picker>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="create">Create ticket</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { PRIORITIES, STATUSES } from "../helpers/constants";

export default Vue.extend({
  props: {
    show: { type: Boolean, default: false },
  },

  computed: {
    ...mapState(["error"]),

    PRIORITIES: () => PRIORITIES,
    STATUSES: () => STATUSES,
  },

  data: () => ({
    email: "",
    title: "",
    description: "",
    dueDate: "",
    status: null,
    priority: null,
  }),

  methods: {
    ...mapActions(["createTicket"]),

    clear() {
      this.email = "";
      this.title = "";
      this.description = "";
      this.dueDate = "";
      this.status = null;
      this.priority = null;
    },

    close() {
      this.$emit("close");

      this.clear();
    },

    async create() {
      const ticket = {
        email: this.email,
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        status: this.status,
        priority: this.priority,
      };

      await this.createTicket(ticket);

      if (this.error !== false) return;
      this.$emit("close");
      this.clear();
    },
  },
});
</script>

<style lang="scss" module>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 3rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.5) !important;
  transition: opacity 0.3s;
  will-change: opacity;
  @media (max-width: 600px) {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0;
  }
}

.container {
  position: relative;
  width: 100%;
  max-width: 52rem;
  height: auto;
  max-height: 90vh;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: transform 0.3s;

  @media (max-width: 600px) {
    max-width: 335px;
    max-height: 520px;
    margin: 2%;
  }
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  color: #000000;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
}

.close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}
</style>

<style lang="scss" scoped>
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-container {
  will-change: transform;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
