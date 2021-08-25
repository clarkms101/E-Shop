<template>
  <div class="col-md-3">
    <div class="list-group sticky-top">
      <!-- 金牌專賣店 -->
      <router-link
        class="list-group-item list-group-item-action active"
        data-toggle="list"
        to="/portal_index/products/金牌"
      >
        <i class="fa fa-suitcase" aria-hidden="true"></i> 金牌專賣店
      </router-link>

      <!-- 禮品區 -->
      <router-link
        class="list-group-item list-group-item-action"
        data-toggle="list"
        to="/portal_index/products/禮品"
      >
        <i class="fa fa-suitcase" aria-hidden="true"></i> 禮品區
      </router-link>

      <!-- 影音商品 -->
      <a href="#" class="list-group-item list-group-item-action disabled">
        <i class="fa fa-film" aria-hidden="true"></i> 影音商品</a
      >

      <!-- 寵物專用 -->
      <router-link
        class="list-group-item list-group-item-action"
        data-toggle="list"
        to="/portal_index/products/寵物用品"
      >
        <i class="fa fa-suitcase" aria-hidden="true"></i> 寵物專用
      </router-link>

      <!-- 居家環境 -->
      <a href="#" class="list-group-item list-group-item-action disabled">
        <i class="fa fa-tree" aria-hidden="true"></i> 居家環境</a
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>
