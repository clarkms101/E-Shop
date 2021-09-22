<template>
  <div class="col-md-9">
    <!-- Search bar -->
    <SearchBar />

    <!-- 主要商品列表 (Card) -->
    <div class="tab-content">
      <div class="tab-pane active">
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
                v-lazy="productItem.imageUrl"
                alt="Card image cap"
              />
              <div class="card-body">
                <h4 class="card-title">{{ productItem.title }}</h4>
                <p class="card-text">{{ productItem.description }}</p>
                <p class="card-text">{{ productItem.content }}</p>
              </div>
              <div class="card-footer border-top-0 bg-white">
                <!-- <a
                  href="#/portal_product"
                  class="btn btn-outline-secondary btn-block btn-sm"
                  v-if="productItem.isEnabled"
                >
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                  搶購去
                </a> -->
                <router-link
                  :to="{
                    name: 'PortalProduct',
                    params: { productId: productItem.productId }
                  }"
                  class="btn btn-outline-secondary btn-block btn-sm"
                  v-if="productItem.isEnabled"
                >
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                  搶購去
                </router-link>

                <a
                  href=""
                  class="btn btn-secondary btn-user btn-block disabled"
                  v-else
                >
                  <i class="fa fa-truck"></i>
                  即將到貨
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 資料清單分頁 -->
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../../ProductsPagination.vue";
import SearchBar from "../../ProductsSearchBar.vue";

export default {
  components: {
    Pagination,
    SearchBar
  },
  methods: {
    getProducts(page) {
      this.$store.dispatch("getProducts", { page: page });
    }
  },
  computed: {
    pagination() {
      return this.$store.state.pagination;
    },
    products() {
      return this.$store.state.products;
    }
  },
  created() {
    this.getProducts(1);
  }
};
</script>
