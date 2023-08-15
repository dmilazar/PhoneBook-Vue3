<script setup lang="ts">
import { useModal } from "../stores/modal";

const modalStore = useModal();
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="danger-wrap col-md-2 col-sm-12">
        <span class="danger-sign">
          <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
        </span>
      </div>
      <div class="content col-md-10 col-sm-12">
        <h2>Delete</h2>
        <span class="message d-block"
          >Are you sure you want to delete this contact?</span
        >
        <button
          type="button"
          class="btn btn-danger"
          @click="modalStore.confirm"
        >
          Delete
        </button>
        <button type="button" class="btn btn-light" @click="modalStore.close">
          Cancle
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles.scss";

.danger-wrap {
  .danger-sign {
    background-color: rgb(221, 177, 177);
    border-radius: 45px;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    display: flex;

    svg {
      color: red;
      font-size: 40px;
      position: relative;
      bottom: 3px;
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
  }
}

.content {
  text-align: left;

  h2 {
    color: black;
  }
  .message {
    color: gray;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .btn {
    font-size: 20px;
  }

  @media screen and (max-width: 767px) {
    text-align: center;
    padding: 30px 0;

    .message,
    .btn {
      font-size: 15px;
      margin-bottom: 10px;

      @media screen and (max-width: 331px) {
        margin-left: 0;
      }
    }
  }
}
</style>
