<template>
  <nav class="navbar navbar-light bg-light">
    <a class="nav-link" href="#/" style="font-size:20px">
      <i class="fa fa-heart text-info" aria-hidden="true"></i>
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
        <span
          class="badge badge-pill badge-danger"
          v-if="cart.hasOwnProperty('carts') && cart.carts.length"
        >
          {{ cart.hasOwnProperty("carts") && cart.carts.length }}
        </span>
        <span class="sr-only">unread messages</span>
      </button>
      <div
        class="dropdown-menu dropdown-menu-right p-3"
        style="min-width: 300px"
        data-offset="400"
      >
        <h6>已選擇商品</h6>
        <table class="table table-sm">
          <tbody v-if="cart.carts">
            <tr v-for="cartItem in cart.carts" :key="cartItem.cartDetailId">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeFromCart(cartItem.cartDetailId)"
                >
                  <i class="fa fa-trash-o"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ cartItem.product.title }}
                <div v-if="cartItem.coupon" class="text-success">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">
                {{ cartItem.qty }} {{ cartItem.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ cartItem.product.price | currency }}
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
              <td class="text-right">{{ cart.totalAmount | currency }}</td>
            </tr>
            <tr v-if="cart.finalTotalAmount !== cart.totalAmount">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">
                {{ cart.finalTotalAmount | currency }}
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

        <a href="#/portal_order" class="btn btn-primary btn-block">
          <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
        </a>
      </div>
    </div>
    <a class="btn btn-sm bg-light" :href="'#/login'">
      <i class="fa fa-gear text-dark fa-2x" aria-hidden="true"></i>
    </a>
  </nav>
</template>

<script>
export default {
  methods: {
    getCart() {
      this.$store.dispatch("portalNavbarMoules/getCart");
    },
    removeFromCart(cartDetailId) {
      this.$store
        .dispatch("portalNavbarMoules/removeFromCart", {
          cartDetailId: cartDetailId
        })
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
        .dispatch("portalNavbarMoules/addCouponCode", {
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
    }
  },
  computed: {
    cart() {
      return this.$store.getters["portalNavbarMoules/cart"];
    },
    coupon_code: {
      get() {
        return this.$store.getters["portalNavbarMoules/coupon_code"];
      },
      set(value) {
        this.$store.dispatch("portalNavbarMoules/updateCouponCode", value);
      }
    }
  },
  created() {
    this.getCart();
  }
};
</script>
