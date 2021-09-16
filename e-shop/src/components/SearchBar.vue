<template>
  <div class="d-flex mb-4">
    <form class="form-inline my-3 my-lg-0">
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          v-model="search_product_name"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-warning" @click="getProducts">
            <i class="fa fa-search" aria-hidden="true"></i> Search
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    getProducts() {
      this.$store.dispatch("getProducts", { page: 1 });
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
