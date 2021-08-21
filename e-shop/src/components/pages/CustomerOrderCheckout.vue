<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.orderDetailInfos" :key="item.id">
              <td class="align-middle">{{ item.productTitle }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.productUnit }}
              </td>
              <td class="align-middle text-right">{{ item.productPrice }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.totalAmount }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.userName }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.isPaid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.isPaid === false">
          <button class="btn btn-danger">信用卡付款</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getOrder() {
      this.$store.dispatch("customerOrderCheckoutModules/getOrder");
    },
    payOrder() {
      this.$store.dispatch("customerOrderCheckoutModules/payOrder");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    order() {
      return this.$store.getters["customerOrderCheckoutModules/order"];
    }
  },
  created() {
    this.$store.dispatch(
      "customerOrderCheckoutModules/updateOrderId",
      this.$route.params.orderId
    );
    this.getOrder();
  }
};
</script>
