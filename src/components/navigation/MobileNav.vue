<script setup lang="ts">
import { ref } from "vue";
import Links from "./Links.vue";

const mobileNav = ref<boolean | null>(null);

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};
</script>

<template>
  <div class="mobile-nav">
    <div v-if="mobileNav" class="overlay"></div>
    <div class="mobile-nav-wrap">
      <font-awesome-icon
        icon="fa-solid fa-bars"
        @click="toggleMobileNav"
        :class="{ 'icon-active': mobileNav }"
      />
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="slide-nav">
          <Links :mobileNavActive="mobileNav" @closeNav="toggleMobileNav" />
        </ul>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles.scss";

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
}

.mobile-nav {
  position: fixed;
  display: flex;
  flex-direction: row;
  padding: 35px 0px 26px 30px;
  width: 100%;
  transition: 0.5s ease all;
  margin: 0 auto;
  z-index: 100;
  background: $bgColor;

  ul {
    list-style: none;
  }

  .mobile-nav-wrap {
    display: flex;
    position: absolute;
    top: 0;
    align-items: center;
    height: 100%;
    font-size: 30px;

    .fa-bars {
      cursor: pointer;
      font-size: 28px;
      transition: 0.8s ease all;
      color: gray;
    }

    .slide-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: white;
      top: 0;
      left: 0;
      border-right: 1px solid $borderColor;
      z-index: 99;
      text-align: left;
      padding: 50px 20px;

      li {
        margin-left: 0;

        .link {
          color: #fff;
          font-size: 35px;
          font-weight: 500;
          text-decoration: none;
          transition: 0.5s ease all;
          padding-bottom: 4px;
          border-bottom: 3px solid transparent;

          &:hover {
            border-color: $primary;
          }
        }
      }
    }
  }

  .icon-active {
    transform: rotate(180deg);
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: 1s ease all;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}
</style>
