<script setup lang="ts">
import BaseInput from "../BaseInput.vue";

const emit = defineEmits(["deleteNumber"]);

const deleteNumber = () => {
  emit("deleteNumber");
};

const props = defineProps(["number"]);
const { number } = props;
</script>

<template>
  <div class="row align-items-center">
    <div class="number col-xl-5 col-lg-5 col-md-5">
      <BaseInput
        type="input"
        class="form-control"
        placeholder="phone number"
        v-model="number.number"
      />
    </div>
    <div class="details col-xl-5 col-lg-5 col-md-5">
      <BaseInput
        type="input"
        class="form-control"
        placeholder="details"
        v-model="number.details"
      />
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 btn-wrap">
      <button class="btn btn-link" type="button" @click="deleteNumber">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles.scss";

.row {
  border-bottom: 1px solid $borderColor;
  padding: 10px;

  .number {
    @media screen and (max-width: 767px) {
      margin-bottom: 10px;
    }
  }
}

.btn-wrap {
  text-align: right;
}
</style>
