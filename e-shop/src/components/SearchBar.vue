<template>
  <div class="d-flex mb-4 form-inline">
    <div class="input-group">
      <input
        class="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        v-model="search_product_name"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-warning" @click="getProducts(1)">
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getProducts(page) {
      this.$store.dispatch("getProducts", { page: page });
    }
  },
  computed: {
    search_product_name: {
      get() {
        return this.$store.getters["search_product_name"];
      },
      set(value) {
        this.$store.dispatch("updateSearchProductName", value);
      }
    }
  }
};
</script>
