<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- Products -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                原價 {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fa fa-spinner fa-spin"
                v-if="loadingProductId === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                class="fa fa-spinner fa-spin"
                v-if="loadingProductId === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 資料清單分頁 -->
    <Pagination :pagination="pagination" @emitPages="getProducts"></Pagination>

    <!-- Product Modal (Detail) -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
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
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                原價 {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" id="" v-model="qty">
              <option value="" disabled>-- 請選擇數量 --</option>
              <option v-for="num in 10" :key="num" :value="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ totalPrice }}</strong
              >元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, qty)"
            >
              <i
                class="fa fa-spinner fa-spin"
                v-if="loadingProductId === product.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Shopping Cart -->
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <!-- shopping items -->
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeFromCart(item.id)"
                >
                  <i class="fa fa-trash-o"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div v-if="item.coupon" class="text-success">已套用優惠券</div>
              </td>
              <td class="align-middle">
                {{ item.qty }} {{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.final_total | currency }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td>尚未加入任何產品，快去逛逛吧！</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total | currency }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">
                {{ cart.final_total | currency }}
              </td>
            </tr>
          </tfoot>
        </table>

        <!-- Coupon -->
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Form-->
    <div class="my-5 row justify-content-center">
      <validation-observer v-slot="{ invalid }" class="col-md-6">
        <form @submit.prevent="createOrder">
          <!-- Email -->
          <validation-provider
            rules="required|email|max:50"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                v-model="form.user.email"
                class="form-control"
                :class="classes"
                placeholder="輸入Email"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- User Name -->
          <validation-provider
            rules="required|max:10"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                id="username"
                type="text"
                name="收件人姓名"
                v-model="form.user.name"
                class="form-control"
                :class="classes"
                placeholder="輸入姓名"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- Phone Number -->
          <validation-provider
            rules="required|numeric|max:15"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                id="usertel"
                type="tel"
                name="收件人電話"
                v-model="form.user.tel"
                class="form-control"
                :class="classes"
                placeholder="請輸入電話"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- Address -->
          <validation-provider
            rules="required|max:100"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="address">收件人地址</label>
              <input
                id="address"
                type="text"
                name="收件人地址"
                v-model="form.user.address"
                class="form-control"
                :class="classes"
                placeholder="請輸入地址"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- Comment -->
          <validation-provider rules="max:200" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="address">留言</label>
              <textarea
                id="comment"
                name="留言"
                cols="30"
                rows="10"
                class="form-control"
                :class="classes"
                v-model="form.message"
              ></textarea>
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <div class="text-right">
            <!-- 依據驗證結果來決定要不要開啟送出表單的按鈕 -->
            <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination.vue";

export default {
  name: "CustomerOrder",
  components: {
    Pagination
  },
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      coupon_code: ""
    };
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch("getProducts", { page: page });
    },
    getProduct(id) {
      this.$store.dispatch("getProduct", { productId: id });
      // todo
      $("#productModal").modal("show");
    },
    addToCart(id, qty = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$store.dispatch("updateLoadingProductId", { loadingProductId: id });
      const cart = {
        product_id: id,
        qty: qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response.data);
        this.$store.dispatch("updateLoadingProductId", {
          loadingProductId: ""
        });
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(url).then(response => {
        console.log(response.data);
        vm.cart = response.data.data;
        vm.$store.dispatch("updateLoading", false);
      });
    },
    removeFromCart(id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      this.$http.delete(url).then(response => {
        this.$bus.$emit("message:push", response.data.message, "success");
        this.getCart();
        vm.$store.dispatch("updateLoading", false);
      });
    },
    addCouponCode() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      };
      vm.$store.dispatch("updateLoading", true);
      this.$http.post(url, { data: coupon }).then(response => {
        if (response.data.success) {
          this.$bus.$emit("message:push", response.data.message, "success");
          this.getCart();
        } else {
          this.$bus.$emit("message:push", response.data.message, "danger");
        }

        vm.$store.dispatch("updateLoading", false);
      });
    },
    createOrder() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      vm.$store.dispatch("updateLoading", true);

      this.$http.post(url, { data: order }).then(response => {
        console.log("訂單已建立", response);
        if (response.data.success) {
          // 轉跳到確認頁面
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        vm.$store.dispatch("updateLoading", false);
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    totalPrice() {
      return this.$store.state.qty * this.$store.state.product.price;
    },
    products() {
      return this.$store.state.products;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    loadingProductId() {
      return this.$store.state.loadingProductId;
    },
    product() {
      return this.$store.state.product;
    },
    qty: {
      get() {
        return this.$store.state.qty;
      },
      set(selectQty) {
        this.$store.dispatch("updateQty", { qty: selectQty });
      }
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
