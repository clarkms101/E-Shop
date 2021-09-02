<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- 結帳頁面 -->
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            2.金流付款
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            3.完成
          </div>
        </div>
      </section>

      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">{{
                  cart.finalTotalAmount | currency
                }}</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody v-if="cart.carts">
                <tr v-for="cartItem in cart.carts" :key="cartItem.cartDetailId">
                  <td class="align-middle text-center">
                    <a
                      href="#removeModal"
                      class="text-muted"
                      data-toggle="modal"
                      :data-title="
                        `刪除 ${cartItem.product.title} ${cartItem.qty} ${cartItem.product.unit}`
                      "
                      @click="removeFromCart(cartItem.cartDetailId)"
                    >
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img
                      :src="cartItem.product.imageUrl"
                      class="img-fluid img-thumbnail"
                      alt=""
                    />
                  </td>
                  <td class="align-middle">{{ cartItem.product.title }}</td>
                  <td class="align-middle">
                    {{ cartItem.qty }} {{ cartItem.product.unit }}
                  </td>
                  <td class="align-middle text-right">
                    {{ (cartItem.product.price * cartItem.qty) | currency }}
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">運費</td>
                  <td class="text-right">
                    <!-- todo -->
                    <strong>$0</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong> {{ cart.finalTotalAmount | currency }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">
            訂購人資訊
          </h5>

          <!-- Order Form-->
          <form id="needs-validation" novalidate @submit.prevent="createOrder">
            <div class="form-row">
              <!-- User Name -->
              <div class="form-group col-md-6">
                <label for="username">收件人姓名</label>
                <input
                  id="username"
                  type="text"
                  name="收件人姓名"
                  v-model="orderForm_user_name"
                  class="form-control"
                  placeholder="輸入姓名"
                />
                <div class="invalid-feedback">
                  請輸入姓名
                </div>
              </div>

              <!-- Email -->
              <div class="form-group col-md-6">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="orderForm_user_email"
                  class="form-control"
                  placeholder="輸入Email"
                />
                <div class="invalid-feedback">
                  請輸入正確的 Email
                </div>
              </div>
            </div>

            <div class="form-row">
              <!-- Country -->
              <div class="form-group col-md-4">
                <label for="country">國家</label>
                <select
                  name=""
                  id="country"
                  class="form-control"
                  v-model="selectCountry"
                  required
                >
                  <option disabled value="">請選擇</option>
                  <option :value="item" v-for="item in country" :key="item">{{
                    item
                  }}</option>
                </select>
              </div>

              <!-- City -->
              <div class="form-group col-md">
                <label for="city">城市</label>
                <select
                  name=""
                  id="city"
                  class="form-control"
                  v-model="selectCity"
                  required
                >
                  <option disabled value="">請選擇</option>
                  <option :value="item" v-for="item in city" :key="item">{{
                    item
                  }}</option>
                </select>
              </div>

              <!-- Postal Code -->
              <div class="form-group col-md">
                <label for="postalCode">郵遞區號</label>
                <input
                  type="text"
                  class="form-control"
                  id="postalCode"
                  v-model.number="postalCode"
                />
              </div>
            </div>

            <!-- Address -->
            <div class="form-group">
              <label for="address">收件人地址</label>
              <input
                id="address"
                type="text"
                name="收件人地址"
                v-model="orderForm_user_address"
                class="form-control"
                placeholder="請輸入地址"
              />
              <div class="invalid-feedback">
                請輸入地址
              </div>
            </div>
            <div class="text-right">
              <a href="#/" class="btn btn-secondary">繼續選購</a>
              <button type="submit" class="btn btn-primary">確認付款</button>
            </div>
          </form>
        </div>
      </section>
    </div>

    <!-- 底層資訊區 -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "./Partial/Navbar.vue";
import Footer from "./Partial/Footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    getCart() {
      this.$store.dispatch("portalOrderMoules/getCart");
    },
    removeFromCart(cartDetailId) {
      this.$store.dispatch("portalOrderMoules/removeFromCart", {
        cartDetailId: cartDetailId
      });
    },
    createOrder() {
      this.$store.dispatch("portalOrderMoules/createOrder");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart() {
      return this.$store.getters["portalOrderMoules/cart"];
    },
    country() {
      return this.$store.getters["portalOrderMoules/country"];
    },
    city() {
      return this.$store.getters["portalOrderMoules/city"];
    },
    selectCountry: {
      get() {
        return this.$store.getters["portalOrderMoules/selectCountry"];
      },
      set(value) {
        this.$store.dispatch("portalOrderMoules/updateSelectCountry", value);
      }
    },
    postalCode: {
      get() {
        return this.$store.getters["portalOrderMoules/postalCode"];
      },
      set(value) {
        this.$store.dispatch("portalOrderMoules/updatePostalCode", value);
      }
    },
    selectCity: {
      get() {
        return this.$store.getters["portalOrderMoules/selectCity"];
      },
      set(value) {
        this.$store.dispatch("portalOrderMoules/updateSelectCity", value);
      }
    },
    orderForm_user_name: {
      get() {
        return this.$store.getters["portalOrderMoules/orderForm_user_name"];
      },
      set(value) {
        this.$store.dispatch(
          "portalOrderMoules/updateOrderFormUserName",
          value
        );
      }
    },
    orderForm_user_email: {
      get() {
        return this.$store.getters["portalOrderMoules/orderForm_user_email"];
      },
      set(value) {
        this.$store.dispatch(
          "portalOrderMoules/updateOrderFormUserEmail",
          value
        );
      }
    },
    orderForm_user_tel: {
      get() {
        return this.$store.getters["portalOrderMoules/orderForm_user_tel"];
      },
      set(value) {
        this.$store.dispatch("portalOrderMoules/updateOrderFormUserTel", value);
      }
    },
    orderForm_user_address: {
      get() {
        return this.$store.getters["portalOrderMoules/orderForm_user_address"];
      },
      set(value) {
        this.$store.dispatch(
          "portalOrderMoules/updateOrderFormUserAddress",
          value
        );
      }
    },
    orderForm_message: {
      get() {
        return this.$store.getters["portalOrderMoules/orderForm_message"];
      },
      set(value) {
        this.$store.dispatch("portalOrderMoules/updateOrderFormMessage", value);
      }
    }
  },
  created() {
    this.getCart();
  }
};
</script>
