<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pagination.hasPrePage }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getProducts(pagination.currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.totalPages"
        :key="page"
        :class="{ active: pagination.currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.hasNextPage }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getProducts(pagination.currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    getProducts(page) {
      this.$store.dispatch("getProducts", { page: page });
    }
  },
  computed: {
    pagination() {
      return this.$store.getters["pagination"];
    }
  }
};
</script>
