<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 上層導覽列 (headers) -->
    <Navbar />

    <!-- 確認頁面 -->
    <div class="container main-contant py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-3 text-secondary">結帳完成</h1>
          <section class="form-row align-items-center text-center">
            <div class="col">
              <div class="alert alert-success alert-rounded mb-0" role="alert">
                完成
              </div>
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
              <tr>
                <td class="align-middle">
                  <img
                    src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                    class="img-fluid img-thumbnail"
                    alt=""
                  />
                </td>
                <td class="align-middle">金牌西裝</td>
                <td class="align-middle">1 件</td>
                <td class="align-middle text-right">$520</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">運費</td>
                <td class="text-right">
                  <strong>$60</strong>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">合計</td>
                <td class="text-right">
                  <strong>$580</strong>
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
                <td>ag3456***@gmail.com</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>咬 * 手手</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>987654***</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>重慶南路一段122號</td>
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
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {}
};
</script>
