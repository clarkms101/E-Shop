<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in orders"
          :key="key"
          v-if="orders.length"
          :class="{ 'text-secondary': !item.isPaid }"
        >
          <td>{{ item.createDateTime | date }}</td>
          <td><span v-text="item.email" v-if="item.email"></span></td>
          <td>
            <!-- 購買清單 -->
            <ul class="list-unstyled">
              <li v-for="(orderDetail, i) in item.orderDetailInfos" :key="i">
                {{ orderDetail.productTitle }} 數量：{{ orderDetail.qty }}
                {{ orderDetail.productUnit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.totalAmount | currency }}</td>
          <td>
            <strong v-if="item.isPaid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 資料清單分頁 -->
    <Pagination :pagination="pagination" @emitPages="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from "../Pagination.vue";

export default {
  components: {
    Pagination
  },
  methods: {
    getOrders(page = 1) {
      this.$store.dispatch("ordersModules/getOrders", { page: page });
    }
  },
  computed: {
    orders() {
      return this.$store.getters["ordersModules/orders"];
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    pagination() {
      return this.$store.state.pagination;
    }
  },
  created() {
    this.getOrders();
  }
};
</script>
