<script setup lang="ts">
import { useModal } from "../stores/modal";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const modalStore = useModal();
const model = reactive({});

const { isOpen, view } = storeToRefs(modalStore);
</script>
<template>
  <transition name="modal-animation">
    <div v-show="isOpen" class="modal-wrap">
      <transition name="modal-animation-inner">
        <div v-show="modalStore.isOpen" class="modal-inner">
          <div class="content">
            <component :is="view" v-model="model"></component>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<style scoped lang="scss">
@import "@/assets/styles.scss";

.modal-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.8);

  .modal-inner {
    position: relative;
    background-color: $bgColor;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
    max-width: 600px;

    .content {
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 1.2;
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>
