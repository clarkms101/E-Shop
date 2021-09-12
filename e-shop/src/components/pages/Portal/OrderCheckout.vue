<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- 訂單確認頁面 -->
    <div class="container main-contant py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-3 text-secondary">訂購完成</h1>
          <section class="form-row align-items">
            <div class="col">
              <a href="#/" class="btn btn-info">繼續購物</a>
              <a href="javascript:window.print()" class="btn btn-info">訂單列印</a> 
            </div>
          </section>

          <h4 class="text-center my-4">購買資訊</h4>
          <table class="table table-sm">
            <thead>
              <tr>
                <th width="100"></th>
                <th>商品名稱</th>
                <th width="100">數量</th>
                <th width="80">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.orderDetailInfos" :key="item.id">
                <td class="align-middle">
                  <img
                    :src="item.imageUrl"
                    class="img-fluid img-thumbnail"
                    alt=""
                  />
                </td>
                <td class="align-middle">{{ item.productTitle }}</td>
                <td class="align-middle">
                  {{ item.qty }}/{{ item.productUnit }}
                </td>
                <td class="align-middle text-right">
                  {{ item.productPrice | currency }}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">運費</td>
                <td class="text-right">
                  <strong>$0</strong>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">合計</td>
                <td class="text-right">
                  <strong>{{ order.totalAmount | currency }}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h4 class="text-center my-4">個人資料</h4>
          <table class="table">
            <tbody>
              <tr>
                <th width="200">Email</th>
                <td>{{ order.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.userName }}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{{ order.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ order.address }}</td>
              </tr>
            </tbody>
          </table>
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
export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    getOrder() {
      this.$store.dispatch("portalOrderCheckout/getOrder");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    order() {
      return this.$store.getters["portalOrderCheckout/order"];
    }
  },
  created() {
    this.$store.dispatch(
      "portalOrderCheckout/updateOrderId",
      this.$route.params.orderId
    );
    this.getOrder();
  }
};
</script>
