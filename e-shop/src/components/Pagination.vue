<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitGetProduct(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ active: pagination.current_page === page }"
      >
        <a class="page-link" href="#" @click.prevent="emitGetProduct(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitGetProduct(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// 外部使用方式
// <Pagination
//   :pagination="{ 頁碼資訊 }"
//   @emitPages="更新頁面事件"
// ></Pagination>

export default {
  props: ["pagination"],
  data() {
    return {};
  },
  methods: {
    emitGetProduct(page) {
      this.$emit("emitPages", page);
    }
  }
};
</script>
