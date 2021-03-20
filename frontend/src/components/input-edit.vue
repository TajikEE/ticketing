<template>
  <div :class="$style.root" @click.stop v-clickOutside="cancel">
    <input
      :class="$style.input"
      :size="innerValue.length"
      @input="$emit('input', innerValue)"
      @keyup.enter="submit"
      @keyup.esc="cancel"
      autocomplete="nope"
      minlength="1"
      ref="input"
      v-model="innerValue"
    />

    <el-button
      class="custom-icon el-icon-circle-check"
      @click="submit"
      v-if="value !== innerValue"
    ></el-button>

    <el-button
      class="custom-icon el-icon-edit"
      @click="focusInput"
      v-else
    ></el-button>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: null,
  },

  data: () => ({
    innerValue: null,
  }),

  watch: {
    value: {
      handler(value) {
        this.innerValue = value;
      },
      immediate: true,
    },
  },

  methods: {
    focusInput() {
      this.$refs.input.focus();
    },

    cancel() {
      this.$emit("cancel");
    },

    submit() {
      this.$emit("submit");

      this.$refs.input.blur();
    },
  },
});
</script>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  background: #fcfcfc;
  border: 1px solid #bdbdbd;
  border-radius: 2px;
  padding: 0.5rem;
  width: auto;
  outline: none;
  max-width: 100%;
  margin-right: 0.5rem;

  &:hover {
    border: 1px solid #dcdfe6;
  }

  &:focus {
    border-color: #145aa2;
    box-shadow: 0px 0px 2px #145aa2;
  }
}

.input:focus + .enterTip {
  display: block;
}

.custom-icon {
  font-size: 2rem;
}
</style>

<style lang="scss" scoped>
.el-button {
  border: none;
  padding: 0.5rem;
}
</style>
