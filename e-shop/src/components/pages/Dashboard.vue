<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../Sidebar.vue";
import Navbar from "../Narbar.vue";
import Alert from "../AlertMessage.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    Alert
  }
};
</script>
