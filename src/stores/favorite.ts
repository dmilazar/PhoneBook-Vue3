import { defineStore } from "pinia";

export type Favorite = {
  isFavorite: boolean;
};

export const useFavorite = defineStore("favorite", {
  state: (): Favorite => ({
    isFavorite: false,
  }),
  actions: {
    change(isFavorite: boolean) {
      this.isFavorite = isFavorite;
    },
  },
});

export default useFavorite;
