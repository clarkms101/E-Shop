<template>
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
                <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
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
                <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
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

      <!-- 寵用用品 -->
      <div class="tab-pane" id="list-pet">
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
                <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
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
    </div>
    <!-- tab-content end -->
  </div>
</template>

<script>
import Pagination from "../../../Pagination.vue";

export default {
  components: {
    Pagination
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch("portalProductsModules/getProducts", {
        page: page
      });
    }
  },
  computed: {
    pagination() {
      return this.$store.state.pagination;
    },
    products() {
      return this.$store.getters["portalProductsModules/products"];
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
