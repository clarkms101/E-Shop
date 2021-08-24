<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠代碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.couponCode }}</td>
          <td>{{ item.percent }}%</td>
          <!-- filter : timestamp to date -->
          <td>{{ item.dueDateTimeStamp | date }}</td>
          <td>
            <span v-if="item.isEnabled === true" class="text-success"
              >啟用</span
            >
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
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
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon_title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon_code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <!-- watch : timestamp to date -->
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="display_due_date"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon_percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="true"
                  :false-value="false"
                  v-model="tempCoupon_isEnabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              更新優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: {
    config: Object
  },
  data() {
    return {
      display_due_date: new Date()
    };
  },
  watch: {
    display_due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.display_due_date) / 1000);
      this.$store.dispatch("couponsModules/updateTempCouponDueDate", timestamp);
    }
  },
  methods: {
    openCouponModal(isNew, item) {
      const vm = this;
      $("#couponModal").modal("show");
      this.$store.dispatch("couponsModules/updateIsNewCoupon", isNew);
      if (isNew) {
        this.$store.dispatch("couponsModules/updateTempCoupon", {});
        vm.display_due_date = new Date();
      } else {
        this.$store.dispatch(
          "couponsModules/updateTempCoupon",
          Object.assign({}, item)
        );
        console.log(item);
        const dateAndTime = new Date(item.dueDateTimeStamp * 1000)
          .toISOString()
          .split("T");
        vm.display_due_date = dateAndTime[0];
      }
    },
    getCoupons(page = 1) {
      this.$store.dispatch("couponsModules/getCoupons", { page: page });
    },
    updateCoupon() {
      this.$store.dispatch("couponsModules/updateCoupon");
      $("#couponModal").modal("hide");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    tempCoupon_title: {
      get() {
        return this.$store.getters["couponsModules/tempCoupon_title"];
      },
      set(value) {
        this.$store.dispatch("couponsModules/updateTempCouponTitle", value);
      }
    },
    tempCoupon_isEnabled: {
      get() {
        return this.$store.getters["couponsModules/tempCoupon_isEnabled"];
      },
      set(value) {
        this.$store.dispatch("couponsModules/updateTempCouponIsEnabled", value);
      }
    },
    tempCoupon_percent: {
      get() {
        return this.$store.getters["couponsModules/tempCoupon_percent"];
      },
      set(value) {
        this.$store.dispatch("couponsModules/updateTempCouponPercent", value);
      }
    },
    tempCoupon_dueDate: {
      get() {
        return this.$store.getters["couponsModules/tempCoupon_dueDate"];
      },
      set(value) {
        this.$store.dispatch("couponsModules/updateTempCouponDueDate", value);
      }
    },
    tempCoupon_code: {
      get() {
        return this.$store.getters["couponsModules/tempCoupon_code"];
      },
      set(value) {
        this.$store.dispatch("couponsModules/updateTempCouponCode", value);
      }
    },
    coupons() {
      return this.$store.getters["couponsModules/coupons"];
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>
