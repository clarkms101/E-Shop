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
          v-for="(item, key) in sortedOrder"
          :key="key"
          v-if="orders.length"
          :class="{ 'text-secondary': !item.is_paid }"
        >
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <!-- 購買清單 -->
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
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
      this.$store.dispatch("getOrders", { page: page });
    }
  },
  computed: {
    sortedOrder() {
      let newOrder = [];
      var oldOrder = this.$store.state.orders;
      if (oldOrder.length) {
        newOrder = oldOrder.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
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
