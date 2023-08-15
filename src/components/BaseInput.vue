<template>
  <label v-if="label">{{ label }}</label>
  <input
    type="text"
    :value="modelValue"
    @input="($event: Event) => $emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles.scss";

label {
  margin-bottom: 5px;
  color: gray;
}
</style>
