<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 訊息通知 -->
    <Alert />

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- 結帳頁面 -->
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div
            class="alert active alert-rounded mb-0"
            role="alert"
            :class="[step == 'step1' ? 'alert-success' : 'alert-light']"
          >
            1.輸入訂單資料
          </div>
        </div>
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            role="alert"
            :class="[step == 'step2' ? 'alert-success' : 'alert-light']"
          >
            2.付款方式
          </div>
        </div>
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            role="alert"
            :class="[step == 'step3' ? 'alert-success' : 'alert-light']"
          >
            3.訂購完成
          </div>
        </div>
      </section>

      <!-- step1 購物清單、買家資訊 -->
      <section class="row justify-content-center mt-5" v-if="step == 'step1'">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a
                  data-toggle="collapse"
                  href="#collapseOne"
                  class="btn btn-info"
                >
                  購物車明細
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">{{
                  cart.finalTotalAmount | currency
                }}</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse show mt-3">
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
                  <td class="align-middle">
                    <a
                      :href="'/#/portal_product/' + cartItem.product.productId"
                      target="_blank"
                      >{{ cartItem.product.title }}</a
                    >
                    <div v-if="cartItem.coupon" class="text-success">
                      已套用優惠券
                    </div>
                  </td>
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
                    <!-- todo 運費計算-->
                    <strong>$0</strong>
                  </td>
                </tr>

                <tr v-if="cart.finalTotalAmount !== cart.totalAmount">
                  <td colspan="4" class="text-right text-success">合計</td>
                  <td class="text-right text-success">
                    <strong> {{ cart.finalTotalAmount | currency }}</strong>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong> {{ cart.totalAmount | currency }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Coupon -->
          <div class="input-group">
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

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">
            訂購人資訊
          </h5>
          <validation-observer v-slot="{ invalid }">
            <!-- Order Form-->
            <form
              id="needs-validation"
              novalidate
              @submit.prevent="createOrder"
            >
              <!-- row-1 -->
              <div class="form-row">
                <!-- User Name -->
                <validation-provider
                  rules="required|max:10"
                  v-slot="{ errors, classes }"
                  class="form-group col-md-6"
                >
                  <div>
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

                <!-- Email -->
                <validation-provider
                  rules="required|email|max:50"
                  v-slot="{ errors, classes }"
                  class="form-group col-md-6"
                >
                  <div>
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
              </div>

              <!-- row-2 -->
              <div class="form-row">
                <!-- Phone Number -->
                <validation-provider
                  rules="required|numeric|max:15"
                  v-slot="{ errors, classes }"
                  class="form-group col-md-6"
                >
                  <div>
                    <label for="usertel">收件人電話</label>
                    <input
                      id="usertel"
                      type="text"
                      name="收件人電話"
                      v-model="orderForm_user_tel"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入電話"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>

              <!-- row-3 -->
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
                <div class="form-group col-md-4">
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
                <div class="form-group col-md-4">
                  <label for="postalCode">郵遞區號</label>
                  <input
                    type="text"
                    class="form-control"
                    id="postalCode"
                    v-model.number="postalCode"
                  />
                </div>
              </div>

              <!-- row-4 -->
              <div class="form-row">
                <!-- Address -->
                <validation-provider
                  rules="required|max:100"
                  v-slot="{ errors, classes }"
                  class="form-group col-md-12"
                >
                  <div>
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
              </div>

              <!-- row-5 -->
              <div class="form-row">
                <!-- Comment -->
                <validation-provider
                  rules="max:200"
                  v-slot="{ errors, classes }"
                  class="form-group col-md-12"
                >
                  <div>
                    <label for="address">留言</label>
                    <textarea
                      id="comment"
                      name="留言"
                      rows="3"
                      class="form-control"
                      :class="classes"
                      v-model="orderForm_message"
                    ></textarea>
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>

              <div class="text-right">
                <a href="#/" class="btn btn-secondary">繼續選購</a>

                <!-- Next Step -->
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="invalid"
                  @click.prevent="step = 'step2'"
                >
                  下一步
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </section>

      <!-- step2 付款方式 -->
      <section
        class="row justify-content-center mt-5"
        v-else-if="step == 'step2'"
      >
        <div class="col-md-8">
          <!-- 貨到付款 -->
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <span><strong>貨到付款</strong></span>
                </div>
                <div class="col-md-6 text-right" style="margin-top:-5px"></div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="numeric" class="control-label">
                  <strong>收件者地址</strong>
                </label>
                <p class="lead">
                  {{
                    selectCountry +
                      "-" +
                      selectCity +
                      "-" +
                      postalCode +
                      "-" +
                      orderForm_user_address
                  }}
                </p>
              </div>

              <div class="form-group">
                <input
                  value="貨到付款"
                  type="button"
                  class="btn btn-info form-control mt-1"
                  @click="createOrder('CashOnDelivery')"
                />
              </div>
            </div>
          </div>

          <!-- 信用卡付款 -->
          <!-- todo 加上輸入驗證 -->
          <div class="card mt-5">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <span><strong>信用卡付款</strong></span>
                </div>
                <div class="col-md-6 text-right" style="margin-top:-5px">
                  <i class="fa fa-cc-visa" style="font-size:24px"></i>
                  <i class="fa fa-cc-mastercard" style="font-size:24px"></i>
                  <i class="fa fa-cc-jcb" style="font-size:24px"></i>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="numeric" class="control-label">
                  <strong>持有者姓名</strong>
                </label>
                <input type="text" class="input-lg form-control" />
              </div>
              <div class="form-group">
                <label for="cc-number" class="control-label">
                  <strong>卡號</strong></label
                >
                <input
                  id="cc-number"
                  type="tel"
                  class="input-lg form-control cc-number"
                  autocomplete="cc-number"
                  placeholder="•••• •••• •••• ••••"
                  required
                />
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="cc-exp" class="control-label">
                      <strong>到期日</strong>
                    </label>
                    <input
                      id="cc-exp"
                      type="tel"
                      class="input-lg form-control cc-exp"
                      autocomplete="cc-exp"
                      placeholder="•• / ••"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="cc-cvc" class="control-label">CVC</label>
                    <input
                      id="cc-cvc"
                      type="tel"
                      class="input-lg form-control cc-cvc"
                      autocomplete="off"
                      placeholder="••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <input
                  value="信用卡付款"
                  type="button"
                  class="btn btn-info form-control mt-1"
                  @click="createOrder('CreditCardPayment')"
                />
              </div>
            </div>
          </div>

          <!-- Previous -->
          <div class="mt-3">
            <button
              type="submit"
              class="btn btn-secondary"
              @click.prevent="step = 'step1'"
            >
              上一步
            </button>
          </div>
        </div>
      </section>

      <!-- step3 購買完成 -->
      <!-- <section
        class="row justify-content-center mt-5"
        v-else-if="step == 'step3'"
      >
        <div class="col-md-8">
          <p>step3</p>
        </div>
      </section> -->
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
    return {
      step: "step1"
    };
  },
  components: {
    Navbar,
    Footer,
    Alert
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
    createOrder(paymentMethod) {
      this.$store
        .dispatch("portalOrderMoules/createOrder", {
          paymentMethod: paymentMethod
        })
        .then(
          response => {
            if (response.data.success) {
              // 轉跳到確認頁面
              this.$router.push(
                `/portal_order_checkout/${response.data.orderId}`
              );
            } else {
              this.$store.dispatch("alertMoules/addMessage", {
                content: response.data.message,
                style: "danger"
              });
            }
          },
          error => {
            console.log(error);
            this.$store.dispatch("alertMoules/addMessage", {
              content: "處理失敗",
              style: "danger"
            });
          }
        );
    },
    addCouponCode(coupon_code) {
      this.$store.dispatch("portalOrderMoules/addCouponCode", {
        coupon_code: coupon_code
      });
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
    },
    coupon_code: {
      get() {
        return this.$store.getters["portalOrderMoules/coupon_code"];
      },
      set(value) {
        this.$store.dispatch("portalOrderMoules/updateCouponCode", value);
      }
    }
  },
  created() {
    this.getCart();
  }
};
</script>
