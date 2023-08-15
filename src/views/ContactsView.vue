<script setup lang="ts">
const back = () => {
  window.history.back();
};
</script>

<template>
  <div class="row content-wrap">
    <div class="col-sm-10 col-12 content">
      <font-awesome-icon icon="fa-solid fa-arrow-left" @click="back" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles.scss";

.content {
  svg {
    font-size: 22px;
    bottom: 50px;
    cursor: pointer;

    @media screen and (max-width: 1199px) {
      bottom: 50px;
    }

    @media screen and (max-width: 575px) {
      left: 33px;
      bottom: 0px;
    }
  }
}
</style>
