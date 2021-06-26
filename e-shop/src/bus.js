import Vue from "vue";

Vue.prototype.$bus = new Vue();

// Bus清單
// 1.Message Bus
// vm.$bus.$emit("message:push", message, status);
// message參數: string, 訊息內容
// status參數: string, Alert的樣式 (BootStrap樣式 ex: info, default...)