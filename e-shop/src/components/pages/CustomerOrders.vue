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
              @click="addCouponCode(coupon_code)"
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
                v-model="orderForm_user_email"
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
                v-model="orderForm_user_name"
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
                v-model="orderForm_user_tel"
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
                v-model="orderForm_user_address"
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
                v-model="orderForm_message"
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
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch("customerOrdersModules/getProducts", { page: page });
    },
    async getProduct(id) {
      await this.$store.dispatch("customerOrdersModules/getProduct", {
        productId: id
      });
      // 待產品資料取完刷新再跳出視窗
      $("#productModal").modal("show");
    },
    async addToCart(id, qty = 1) {
      await this.$store.dispatch("customerOrdersModules/addToCart", {
        productId: id,
        productQty: qty
      });
      $("#productModal").modal("hide");
    },
    getCart() {
      this.$store.dispatch("customerOrdersModules/getCart");
    },
    removeFromCart(id) {
      this.$store
        .dispatch("customerOrdersModules/removeFromCart", { itemId: id })
        .then(
          response => {
            this.$bus.$emit("message:push", response.data.message, "success");
          },
          error => {
            console.log(error);
            this.$bus.$emit("message:push", "處理失敗", "danger");
          }
        );
    },
    addCouponCode(coupon_code) {
      this.$store
        .dispatch("customerOrdersModules/addCouponCode", {
          coupon_code: coupon_code
        })
        .then(
          response => {
            if (response.data.success) {
              this.$bus.$emit("message:push", response.data.message, "success");
            } else {
              this.$bus.$emit("message:push", response.data.message, "danger");
            }
          },
          error => {
            console.log(error);
            this.$bus.$emit("message:push", "處理失敗", "danger");
          }
        );
    },
    createOrder() {
      this.$store.dispatch("customerOrdersModules/createOrder").then(
        response => {
          if (response.data.success) {
            // 轉跳到確認頁面
            this.$router.push(
              `/customer_order_checkout/${response.data.orderId}`
            );
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        },
        error => {
          console.log(error);
          this.$bus.$emit("message:push", "處理失敗", "danger");
        }
      );
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    totalPrice() {
      return this.$store.getters["customerOrdersModules/totalPrice"];
    },
    products() {
      return this.$store.getters["customerOrdersModules/products"];
    },
    loadingProductId() {
      return this.$store.getters["customerOrdersModules/loadingProductId"];
    },
    product() {
      return this.$store.getters["customerOrdersModules/product"];
    },
    cart() {
      return this.$store.getters["customerOrdersModules/cart"];
    },
    qty: {
      get() {
        return this.$store.getters["customerOrdersModules/qty"];
      },
      set(value) {
        this.$store.dispatch("customerOrdersModules/updateQty", value);
      }
    },
    coupon_code: {
      get() {
        return this.$store.getters["customerOrdersModules/coupon_code"];
      },
      set(value) {
        this.$store.dispatch("customerOrdersModules/updateCouponCode", value);
      }
    },
    orderForm_user_name: {
      get() {
        return this.$store.getters["customerOrdersModules/orderForm_user_name"];
      },
      set(value) {
        this.$store.dispatch(
          "customerOrdersModules/updateOrderFormUserName",
          value
        );
      }
    },
    orderForm_user_email: {
      get() {
        return this.$store.getters[
          "customerOrdersModules/orderForm_user_email"
        ];
      },
      set(value) {
        this.$store.dispatch(
          "customerOrdersModules/updateOrderFormUserEmail",
          value
        );
      }
    },
    orderForm_user_tel: {
      get() {
        return this.$store.getters["customerOrdersModules/orderForm_user_tel"];
      },
      set(value) {
        this.$store.dispatch(
          "customerOrdersModules/updateOrderFormUserTel",
          value
        );
      }
    },
    orderForm_user_address: {
      get() {
        return this.$store.getters[
          "customerOrdersModules/orderForm_user_address"
        ];
      },
      set(value) {
        this.$store.dispatch(
          "customerOrdersModules/updateOrderFormUserAddress",
          value
        );
      }
    },
    orderForm_message: {
      get() {
        return this.$store.getters["customerOrdersModules/orderForm_message"];
      },
      set(value) {
        this.$store.dispatch(
          "customerOrdersModules/updateOrderFormMessage",
          value
        );
      }
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
