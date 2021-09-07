<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 訊息通知 -->
    <Alert />

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- Carousel -->
    <Carousel />

    <div class="container main-contant mb-1">
      <div class="row">
        <!-- 左側選單 (List group) -->
        <Sidebar />

        <!-- 右側商品清單 -->
        <router-view :key="$route.path"></router-view>
      </div>
    </div>

    <!-- 底層資訊區 -->
    <Footer />

    <!-- 購物車刪除確認視窗 -->
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              否
            </button>
            <button type="button" class="btn btn-outline-danger px-5">
              是
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Sidebar from "./Partial/Sidebar.vue";
import Navbar from "./Partial/Navbar.vue";
import Footer from "./Partial/Footer.vue";
import Alert from "../../AlertMessage.vue";
import Carousel from "../Portal/Partial/Carousel.vue";

export default {
  data() {
    return {};
  },
  components: {
    Sidebar,
    Navbar,
    Footer,
    Alert,
    Carousel
  },
  methods: {
    removeCart() {
      $("#removeModal").on("show.bs.modal", function(event) {
        var button = $(event.relatedTarget); // 選則當初觸發事件的按鈕
        var title = button.data("title"); // 使用 data-* 來取得特定內容

        var modal = $(this);
        modal.find(".modal-title").text("確認" + title); // 寫入資料
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {}
};
</script>
