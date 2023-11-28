import { defineStore } from 'pinia';

export const useWindowStore = defineStore('window', {
  state: () => ({
    scrollTop: 0
  }),

  actions: {},
});
