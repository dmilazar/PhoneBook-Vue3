<script setup lang="ts">
import { ref } from "vue";
import DesktopNav from "@/components/navigation/DesktopNav.vue";
import MobileNav from "@/components/navigation/MobileNav.vue";

const mobile = ref<boolean | null>(false);
const windowWidth = ref<number | null>(null);

const emit = defineEmits(["mobileNavActive"]);

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 1199) {
    mobile.value = true;

    emit("mobileNavActive", true);
    return;
  }
  emit("mobileNavActive", false);
  mobile.value = false;
};

window.addEventListener("resize", checkScreen);
checkScreen();
</script>
<template>
  <header v-show="mobile">
    <MobileNav />
  </header>
  <div v-show="!mobile" class="desk-nav">
    <DesktopNav />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles.scss";

header {
  @media screen and (max-width: 1199px) {
    margin-bottom: 130px;
  }

  @media screen and (max-width: 575px) {
    margin-bottom: 90px;
  }
}

.desk-nav {
  background-color: $bgColor;
  z-index: 99;
  width: 100%;
  transition: 0.5s ease all;
  color: $primary;
}
</style>
