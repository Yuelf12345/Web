import { createPinia, defineStore } from "pinia";

interface Data {
  num: number;
}

export const DataStore = defineStore("data", {
  state: (): Data => ({
    num: 0,
  }),
  getters: {
    double: (state) => state.num * 2,
  },
  actions: {
    addNum() {
      this.num++;
    },
  },
});

const pinia = createPinia();

export default pinia;
