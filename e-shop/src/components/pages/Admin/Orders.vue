<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- serach -->
    <div class="form-row">
      <div class="form-group col-md-3">
        <label for="">開始日期</label>
        <br />
        <date-picker valueType="format" v-model="startDate"></date-picker>
      </div>
      <div class="form-group col-md-3">
        <label for="">結束日期</label>
        <br />
        <date-picker valueType="format" v-model="endDate"></date-picker>
      </div>
      <div class="form-group col-md-2">
        <label for="paymentMethod">付款方式</label>
        <select
          name=""
          id="paymentMethod"
          class="form-control"
          v-model="selectPaymentMethod"
          required
        >
          <option disabled value="">請選擇</option>
          <option
            v-for="item in paymentMethod"
            :value="item.value"
            :key="item.value"
            >{{ item.text }}</option
          >
        </select>
      </div>
      <div class="form-group col-md-2 pt-2">
        <br />
        <button class="btn btn-primary" @click="getOrders(1)">查詢</button>
      </div>
      <div class="form-group col-md-2"></div>
    </div>

    <table class="table table-hover mt-4">
      <thead class="thead-dark">
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>付款方式</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in orders"
          :key="key"
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
          <td>{{ item.paymentMethod }}</td>
          <td>
            <strong v-if="item.isPaid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 資料清單分頁 -->
    <OrdersPagination />
  </div>
</template>

<script>
import OrdersPagination from "../Admin/Partial/OrdersPagination";
// vue2-datepicker
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";

export default {
  components: {
    OrdersPagination,
    DatePicker
  },
  methods: {
    getOrders(page) {
      this.$store.dispatch("ordersModules/getOrders", { page: page });
    },
    getPaymentMethod() {
      this.$store.dispatch("ordersModules/getPaymentMethod");
    }
  },
  computed: {
    orders() {
      return this.$store.getters["ordersModules/orders"];
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    paymentMethod() {
      return this.$store.getters["ordersModules/paymentMethod"];
    },
    startDate: {
      get() {
        return this.$store.getters["ordersModules/startDate"];
      },
      set(value) {
        this.$store.dispatch("ordersModules/updateStartDate", value);
      }
    },
    endDate: {
      get() {
        return this.$store.getters["ordersModules/endDate"];
      },
      set(value) {
        this.$store.dispatch("ordersModules/updateEndDate", value);
      }
    },
    selectPaymentMethod: {
      get() {
        return this.$store.getters["ordersModules/selectPaymentMethod"];
      },
      set(value) {
        this.$store.dispatch("ordersModules/updateSelectPaymentMethod", value);
      }
    }
  },
  created() {
    this.getOrders(1);
    this.getPaymentMethod();
  }
};
</script>
