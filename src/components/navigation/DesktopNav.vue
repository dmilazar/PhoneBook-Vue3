<script setup lang="ts">
import Links from "./Links.vue";
</script>

<template>
  <ul class="nav">
    <Links />
  </ul>
</template>

<style lang="scss" scoped>
@import "@/assets/styles.scss";

.nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: $bgColor;
  top: 0;
  left: 0;
  padding-top: 35px;
  list-style: none;
  text-align: left;
  margin-left: 20px;
}
</style>
