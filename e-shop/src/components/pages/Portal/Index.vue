<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- headers -->
    <nav class="navbar navbar-light">
      <a class="navbar" href="shoppingCart.html" style="font-size:20px">
        <!-- <i class="fa fa-heart text-info" aria-hidden="true"></i> -->
        E-Shop
      </a>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button
          class="btn btn-sm btn-cart bg-light"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">9</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                    data-title="刪除 金牌西裝 1 件"
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">金牌西裝</td>
                <td class="align-middle">1 件</td>
                <td class="align-middle text-right">$520</td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                    data-title="刪除 金牌女裝 1 件"
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">金牌女裝</td>
                <td class="align-middle">1 件</td>
                <td class="align-middle text-right">$480</td>
              </tr>
            </tbody>
          </table>
          <a
            href="shoppingCart-checkout.html"
            class="btn btn-primary btn-block"
          >
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>
      </div>
    </nav>

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
        <div class="col-md-3">
          <div class="list-group sticky-top">
            <a
              class="list-group-item list-group-item-action active"
              data-toggle="list"
              href="#list-gold"
            >
              <i class="fa fa-suitcase" aria-hidden="true"></i> 金牌專賣店</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-gift"
            >
              <i class="fa fa-gift" aria-hidden="true"></i> 禮品區</a
            >
            <a href="#" class="list-group-item list-group-item-action disabled">
              <i class="fa fa-film" aria-hidden="true"></i> 影音商品</a
            >
            <a href="#" class="list-group-item list-group-item-action disabled">
              <i class="fa fa-paw" aria-hidden="true"></i> 寵物專用</a
            >
            <a href="#" class="list-group-item list-group-item-action disabled">
              <i class="fa fa-tree" aria-hidden="true"></i> 居家環境</a
            >
          </div>
        </div>

        <!-- 右側商品清單 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-warning" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- 主要商品列表 (Card) -->
          <div class="tab-content">
            <!-- 金牌 -->
            <div class="tab-pane active" id="list-gold">
              <!-- 該分類的商品清單 -->
              <div class="row">
                <div
                  class="col-md-4 mb-4"
                  v-for="productItem in products"
                  :key="productItem.productId"
                >
                  <div class="card border-0 box-shadow text-center h-100">
                    <img
                      class="card-img-top"
                      :src="productItem.imageUrl"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title">{{ productItem.title }}</h4>
                      <p class="card-text">{{ productItem.description }}</p>
                      <p class="card-text">{{ productItem.content }}</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <a
                        href="#"
                        class="btn btn-outline-secondary btn-block btn-sm"
                      >
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        搶購去
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 資料清單分頁 -->
              <Pagination
                :pagination="pagination"
                @emitPages="getProducts"
              ></Pagination>
            </div>

            <!-- 禮品 -->
            <div class="tab-pane" id="list-gift">
              <div class="row align-items-stretch">
                <div class="col-md-4 mb-4">
                  <div class="card border-0 box-shadow text-center h-100">
                    <img
                      class="card-img-top"
                      src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title">超精緻禮物</h4>
                      <p class="card-text">
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <a
                        href="#"
                        class="btn btn-outline-secondary btn-block btn-sm"
                      >
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        搶購去
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- tab-content end -->
        </div>
      </div>
    </div>
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
import Pagination from "../../Pagination.vue";

export default {
  data() {
    return {};
  },
  components: {
    Pagination
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch("indexModules/getProducts", { page: page });
    },
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
    },
    pagination() {
      return this.$store.state.pagination;
    },
    products() {
      return this.$store.getters["indexModules/products"];
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
