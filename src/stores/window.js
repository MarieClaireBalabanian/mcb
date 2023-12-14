import { defineStore } from 'pinia';

export const useWindowStore = defineStore('window', {
  state: () => ({
    scrollTop: 0,
    windowHeight: 0,
    isDesktop: null,
  }),

  actions: {},
});
