export default {
  namespaced: true,
  state: {
    messages: []
  },
  actions: {
    // 給外部元件傳入訊息用的 (context, style)
    updateMessage(context, value) {
      const timestamp = Math.floor(new Date() / 1000);

      let message = new Object();
      // 訊息內容
      message.content = value.content;
      // 訊息樣式(Bootstrap)
      message.style = value.style;
      // 訊息保留時間
      message.timestamp = timestamp;

      context.commit("ADD_MESSAGE", message);
      context.dispatch("removeMessageByTime", { timestamp: timestamp });
    },
    // alert元件點擊關閉訊息用的
    removeMessage(context, value) {
      context.commit("REMOVE_MESSAGE", { num: value.num });
    },
    removeMessageByTime(context, value) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === value.timestamp) {
            context.commit("REMOVE_MESSAGE", { num: i });
          }
        });
      }, 5000);
    }
  },
  mutations: {
    ADD_MESSAGE(state, payload) {
      state.messages.push(payload);
    },
    REMOVE_MESSAGE(state, payload) {
      state.messages.splice(payload.num, 1);
    }
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  }
};
