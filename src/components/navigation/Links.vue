<script setup lang="ts">
const { mobileNavActive } = defineProps(["mobileNavActive"]);
</script>

<template>
  <li class="logo mb-4">
    <Router-link :to="{ name: 'Home' }" @click="$emit('closeNav')"
      ><img src="/../src/assets/logo.jpg"
    /></Router-link>
    <span class="close" v-show="mobileNavActive" @click="$emit('closeNav')"
      ><font-awesome-icon icon="fa-solid fa-x"
    /></span>
  </li>
  <li class="new-contact">
    <Router-link
      class="link"
      :to="{ name: 'NewContact' }"
      @click="$emit('closeNav')"
      ><font-awesome-icon icon="fa-solid fa-plus" /> New contact</Router-link
    >
  </li>
  <li class="link-wrap">
    <Router-link class="link" :to="{ name: 'Home' }" @click="$emit('closeNav')">
      <font-awesome-icon icon="fa-solid fa-house" />All contacts</Router-link
    >
  </li>
  <li class="link-wrap">
    <Router-link
      class="link"
      :to="{ name: 'Favorites' }"
      @click="$emit('closeNav')"
      ><font-awesome-icon icon="fa-regular fa-heart" />My favorites</Router-link
    >
  </li>
</template>

<style lang="scss" scoped>
@import "@/assets/styles.scss";

li {
  margin-left: 0;
  margin-bottom: 5px;

  .link {
    color: #000;
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;

    i {
      color: black;
    }

    &:hover {
      border-color: $primary;
    }
  }
}

.new-contact {
  background-color: $primary;
  padding: 0 10px;
  border: 1px solid $primary;
  border-radius: 40px;

  .link {
    color: white;

    svg {
      margin-right: 18px;
    }
  }

  &:hover {
    background-color: transparent;

    .link {
      color: black;
    }
  }
}

.link-wrap {
  padding: 0 10px;
  svg {
    font-size: 18px;
    margin-right: 18px;
  }

  &:hover {
    background-color: #ebebeb;
    border-radius: 10px;
  }
}

.logo {
  display: flex;

  img {
    width: 75px;
    height: 52px;
  }

  .close {
    color: $primary;
    right: 14px;
    position: absolute;
    font-weight: 500;
    cursor: pointer;

    svg {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
}

button {
  all: initial;
  cursor: pointer;
}
</style>
