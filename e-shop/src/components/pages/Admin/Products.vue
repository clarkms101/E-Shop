<template>
  <div>
    <!-- Loading 遮罩 -->
    <loading :active.sync="isLoading"></loading>

    <!-- Search bar -->
    <SearchBar />

    <!-- 上層新增按鈕 -->
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <!-- 資料清單 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="80">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.productId">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.originPrice | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.isEnabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 資料清單分頁 -->
    <Pagination />

    <!-- Product Modal (Create, Update) -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct_imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fa fa-refresh fa-spin"
                      v-if="status_fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct_imageUrl"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct_title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct_category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct_unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct_origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct_price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="num">庫存</label>
                    <input
                      type="number"
                      class="form-control"
                      id="num"
                      v-model="tempProduct_num"
                      placeholder="請輸入庫存"
                    />
                  </div>
                  <div class="form-group col-md-6"></div>
                </div>

                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct_description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct_content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct_is_enabled"
                      :true-value="true"
                      :false-value="false"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal (Delete) -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
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
            是否刪除
            <strong class="text-danger">{{ tempProduct_title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 使用JQuery
import $ from "jquery";
import Pagination from "../../Pagination.vue";
import SearchBar from "../../SearchBar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Pagination,
    SearchBar
  },
  methods: {
    getProducts(page) {
      this.$store.dispatch("getProducts", { page: page });
    },
    openModal(isNewProduct, item) {
      console.log(item);
      if (isNewProduct) {
        this.$store.dispatch("productsModules/updateTempProduct", {});
        this.$store.dispatch("productsModules/updateIsNewProduct", true);
      } else {
        this.$store.dispatch("productsModules/updateTempProduct", item);
        this.$store.dispatch("productsModules/updateIsNewProduct", false);
      }
      $("#productModal").modal("show");
    },
    openDelModal(item) {
      this.$store.dispatch("productsModules/updateTempProduct", item);
      $("#delProductModal").modal("show");
    },
    deleteProduct() {
      this.$store.dispatch("productsModules/deleteProduct");
      $("#delProductModal").modal("hide");
    },
    updateProduct() {
      this.$store.dispatch("productsModules/updateProduct");
      $("#productModal").modal("hide");
    },
    uploadFile() {
      // 取得 input file 的上傳檔案
      const uploadFile = this.$refs.files.files[0];
      this.$store
        .dispatch("productsModules/uploadFile", {
          uploadFile: uploadFile
        })
        .then(
          response => {
            if (response.data.success == false) {
              this.$store.dispatch("alertMoules/addMessage", {
                content: response.data.message,
                style: "danger"
              });
            }
          },
          error => {
            console.log(error);
            this.$store.dispatch("alertMoules/addMessage", {
              content: "處理失敗",
              style: "danger"
            });
          }
        );
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    products() {
      return this.$store.getters["products"];
    },
    isNewProduct() {
      return this.$store.getters["productsModules/isNewProduct"];
    },
    status_fileUploading() {
      return this.$store.getters["productsModules/status_fileUploading"];
    },
    tempProduct() {
      return this.$store.getters["productsModules/tempProduct"];
    },
    tempProduct_title: {
      get() {
        return this.$store.getters["productsModules/tempProduct_title"];
      },
      set(value) {
        this.$store.dispatch("productsModules/updateTempProductTitle", value);
      }
    },
    tempProduct_category: {
      get() {
        return this.$store.getters["productsModules/tempProduct_category"];
      },
      set(value) {
        this.$store.dispatch(
          "productsModules/updateTempProductCategory",
          value
        );
      }
    },
    tempProduct_unit: {
      get() {
        return this.$store.getters["productsModules/tempProduct_unit"];
      },
      set(value) {
        this.$store.dispatch("productsModules/updateTempProductUnit", value);
      }
    },
    tempProduct_origin_price: {
      get() {
        return this.$store.getters["productsModules/tempProduct_origin_price"];
      },
      set(value) {
        this.$store.dispatch(
          "productsModules/updateTempProductOriginPrice",
          value
        );
      }
    },
    tempProduct_price: {
      get() {
        return this.$store.getters["productsModules/tempProduct_price"];
      },
      set(value) {
        this.$store.dispatch("productsModules/updateTempProductPrice", value);
      }
    },
    tempProduct_num: {
      get() {
        return this.$store.getters["productsModules/tempProduct_num"];
      },
      set(value) {
        this.$store.dispatch("productsModules/updateTempProductNum", value);
      }
    },
    tempProduct_description: {
      get() {
        return this.$store.getters["productsModules/tempProduct_description"];
      },
      set(value) {
        this.$store.dispatch(
          "productsModules/updateTempProductDescription",
          value
        );
      }
    },
    tempProduct_content: {
      get() {
        return this.$store.getters["productsModules/tempProduct_content"];
      },
      set(value) {
        this.$store.dispatch("productsModules/updateTempProductContent", value);
      }
    },
    tempProduct_is_enabled: {
      get() {
        return this.$store.getters["productsModules/tempProduct_is_enabled"];
      },
      set(value) {
        this.$store.dispatch(
          "productsModules/updateTempProductIsEnabled",
          value
        );
      }
    },
    tempProduct_imageUrl: {
      get() {
        return this.$store.getters["productsModules/tempProduct_imageUrl"];
      },
      set(value) {
        this.$store.dispatch(
          "productsModules/updateTempProductImageUrl",
          value
        );
      }
    }
  },
  created() {
    this.getProducts(1);
  }
};
</script>
