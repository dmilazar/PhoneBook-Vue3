import { markRaw } from "vue";
import { defineStore } from "pinia";

export type Modal = {
  isOpen: boolean;
  isConfirmed: boolean;
  view: object;
};

export const useModal = defineStore("modal", {
  state: (): Modal => ({
    isOpen: false,
    isConfirmed: false,
    view: {},
  }),
  actions: {
    async open(view: object): Promise<Modal> {
      return new Promise((resolve) => {
        this.isOpen = true;
        this.isConfirmed = false;
        this.view = markRaw(view);

        const unsubscribe = this.$subscribe(() => {
          if (this.isConfirmed === true) {
            resolve(this.$state);
            unsubscribe();
          }
        });
      });
    },
    close() {
      this.isOpen = false;
      this.view = {};
    },
    confirm() {
      this.isConfirmed = true;
      this.isOpen = false;
    },
  },
});

export default useModal;
