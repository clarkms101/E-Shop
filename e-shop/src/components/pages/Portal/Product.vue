<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 訊息通知 -->
    <Alert />

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- 產品內容頁面 -->
    <div class="container main-contant mb-1">
      <!-- 瀏覽記錄 -->
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item">
            <a href="#">首頁</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">金牌專賣店</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <!-- 產品說明 -->
      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="sticky-top" style="top: 10px;">
            <h1 class="h2">
              {{ product.title }}
              <small class="text-muted"></small>
            </h1>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted">售價 NT$ {{ product.originPrice }}</del>
              <div class="h3 mb-0 ml-auto text-danger">
                <small>網路價 NT$</small>
                <strong>{{ product.price }}</strong>
              </div>
            </div>
            <hr />
            <!-- 尺寸:
            <div
              class="btn-group btn-group-sm btn-group-toggle"
              data-toggle="buttons"
            >
              <label class="btn btn-outline-secondary active">
                <input type="radio" name="size" checked /> SM
              </label>
              <label class="btn btn-outline-secondary">
                <input type="radio" name="size" /> M
              </label>
              <label class="btn btn-outline-secondary disabled">
                <input type="radio" name="size" disabled /> L
              </label>
              <label class="btn btn-outline-secondary">
                <input type="radio" name="size" /> XL
              </label>
            </div> -->

            <!-- todo -->
            <div class="input-group mt-3">
              <select name="" class="form-control mr-1" id="" v-model="qty">
                <option value="" disabled>-- 請選擇數量 --</option>
                <option v-for="num in 10" :key="num" :value="num">
                  {{ num }} {{ product.unit }}
                </option>
              </select>
              <button
                type="button"
                class="btn btn-primary"
                @click="addToCart(product.productId, qty)"
              >
                <i
                  v-if="loadingProductId === product.productId"
                  class="fa fa-spinner fa-spin"
                ></i>
                <i v-else class="fa fa-cart-plus" aria-hidden="true"></i>
                加到購物車
              </button>
            </div>

            <div class="mt-2 text-right text-muted">
              <i class="fa fa-cc-visa" aria-hidden="true"></i>
              <i class="fa fa-cc-jcb" aria-hidden="true"></i>
              <i class="fa fa-cc-paypal" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2>{{ product.description }}</h2>
          <p class="card-text">
            {{ product.content }}
          </p>

          <h3 class="mt-5 text-center">商品圖片</h3>
          <img :src="product.imageUrl" class="w-100" alt="" />

          <!-- <h3 class="mt-5 text-center">簡單就好</h3>
          <img
            src="https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1500"
            class="w-100"
            alt=""
          />

          <h3 class="mt-5 text-center">不佔空間</h3>
          <img
            src="https://images.unsplash.com/photo-1475530060488-75a6de1dca6f?w=675"
            class="w-100"
            alt=""
          /> -->
          <div class="alert alert-secondary mt-4" role="alert">
            <h2 class="text-center">購物說明</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              at! Totam, exercitationem repellat. Saepe facere amet expedita
              perferendis voluptatem dicta dignissimos tempora ut atque, rerum
              doloribus? Magni, blanditiis. Assumenda, distinctio!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底層資訊區 -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "./Partial/Navbar.vue";
import Footer from "./Partial/Footer.vue";
import Alert from "../../AlertMessage.vue";

export default {
  data() {
    return {};
  },
  components: {
    Alert,
    Navbar,
    Footer
  },
  methods: {
    getProduct(id) {
      this.$store.dispatch("portalProductModules/getProduct", {
        productId: id
      });
    },
    addToCart(id, qty = 1) {
      if (qty === "") {
        this.$store.dispatch("alertMoules/addMessage", {
          content: "請選擇數量!",
          style: "danger"
        });
      } else {
        this.$store.dispatch("portalProductModules/addToCart", {
          productId: id,
          productQty: qty
        });
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    product() {
      return this.$store.getters["portalProductModules/product"];
    },
    loadingProductId() {
      return this.$store.getters["portalProductModules/loadingProductId"];
    },
    qty: {
      get() {
        return this.$store.getters["portalProductModules/qty"];
      },
      set(value) {
        this.$store.dispatch("portalProductModules/updateQty", value);
      }
    }
  },
  created() {
    let productId = this.$route.params.productId;
    this.getProduct(productId);
  }
};
</script>
