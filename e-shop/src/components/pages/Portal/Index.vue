<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- jumbotron -->
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <div class="p-3 bg-lighter">
          <h1 class="display-3 font-weight-bold">買到剁手手！最後出清</h1>
          <p class="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div>
    </div>

    <div class="container main-contant mb-1">
      <div class="row">
        <!-- 左側選單 (List group) -->
        <Sidebar />

        <!-- 右側商品清單 -->
        <router-view :key="$route.path"></router-view>
      </div>
    </div>

    <!-- 底層資訊區 -->
    <footer class="bg-light text-muted py-5">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item">© Copright 2021 e-shop</li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-instagram" aria-hidden="true"></i> Instagrame</a
            >
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-facebook-square" aria-hidden="true"></i>
              Facebook</a
            >
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">About</a>
          </li>
        </ul>
        <p class="text-center">Made with Bootstrap4</p>
      </div>
    </footer>

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
import Alert from "../../AlertMessage.vue";

export default {
  data() {
    return {};
  },
  components: {
    Sidebar,
    Navbar,
    Alert
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
