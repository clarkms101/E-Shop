<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">後台管理</a>
    <!-- <input
      class="form-control form-control-dark w-100"
      type="text"
      placeholder="Search"
      aria-label="Search"
    /> -->
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import parseJwt from "../_helpers/parseJwt";

export default {
  methods: {
    signout() {
      const url = `${process.env.APIPATH}/api/Admin/Logout`;
      let token = localStorage.getItem("adminJWT");
      // 將login JWT放到headers再請求
      this.$http.defaults.headers.common.Authorization = `${token}`;
      let apiAccessKey = parseJwt().JwtKeyApiAccessKey;
      this.$http.post(url, { ApiAccessKey: apiAccessKey }).then(response => {
        console.log(response.data);
        // 登出成功導到登入頁面
        if (response.data.success) {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>
