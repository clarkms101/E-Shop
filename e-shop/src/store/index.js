import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴格模式(state不允許外部直接修改)
  strict: true,
  // 資料狀態
  state: {
    isLoading: false
  },
  // 對外開放的動作
  actions: {
    updateLoading(context, status) {
      context.commit("LOADING", status);
    }
  },
  // 操作資料狀態
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    }
  }
});
