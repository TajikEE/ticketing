<template>
  <div>
    <button @click="showModal = true">Create ticket</button>

    <Modal @close="showModal = false" :show="showModal"/>
  </div>
</template>

<script>
import Modal from '../components/modal.vue'

export default {
  name: "Home",

  data: () => ({
    showModal: false
  }),

  components: {
    Modal
  }
};
</script>
