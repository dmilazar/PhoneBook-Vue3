<script setup lang="ts">
import { RouterView } from "vue-router";
import { defineAsyncComponent, ref } from "vue";
import Modal from "../src/components/Modal.vue";
import NavigationView from "@/views/NavigationView.vue";

// const Navigation = defineAsyncComponent(
//   () => import("@/views/NavigationView.vue")
// );

const mobilNavActive = ref();
</script>

<template>
  <Modal />

  <div class="container-fluid">
    <div class="row">
      <div :class="{ 'col-xl-2 col-lg-2 col-md-1 navi': !mobilNavActive }">
        <NavigationView
          @mobileNavActive="(isTrue: boolean) => (mobilNavActive = isTrue)"
        />
        <!-- <component
          :is="Navigation"
          @mobileNavActive="(isTrue: boolean) => (mobilNavActive = isTrue)"
        /> -->
      </div>
      <div class="col-xl-10 col-lg-12 col-md-12">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles.scss";
.row {
  align-items: unset;
  height: 100vh;

  @media screen and (max-width: 1199px) {
    height: unset;
  }
}

.navi {
  border-right: 1px solid $borderColor;
}
</style>
