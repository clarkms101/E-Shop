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
import parseJwt from "../../../../_helpers/parseJwt";
import { postAPI_logout } from "../../../../_helpers/api/admin";

export default {
  methods: {
    signout() {
      // 登入時取得的 api access key
      let apiAccessKey = parseJwt().JwtKeyApiAccessKey;
      postAPI_logout({ ApiAccessKey: apiAccessKey }).then(response => {
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
