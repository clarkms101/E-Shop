import Vue from "vue";
import axios from "axios";
import { deleteAPI_deleteProduct } from "../../_helpers/api/product";
import { postAPI_createProduct } from "../../_helpers/api/product";
import { putAPI_updateProduct } from "../../_helpers/api/product";

export default {
  namespaced: true,
  state: {
    isNewProduct: false,
    tempProduct: {
      productId: 0,
      title: "",
      category: "",
      unit: 0,
      originPrice: 0,
      price: 0,
      num: 0,
      description: "",
      content: "",
      isEnabled: false,
      imageUrl: ""
    },
    status: {
      fileUploading: false
    }
  },
  actions: {
    deleteProduct(context) {
      context.commit("LOADING", true, { root: true });
      var productId = context.state.tempProduct.productId;
      deleteAPI_deleteProduct(productId).then(response => {
        if (response.data.success) {
          context.dispatch("getProducts", { page: 1 }, { root: true });
        } else {
          context.dispatch("getProducts", { page: 1 }, { root: true });
          console.log(response.data.message);
        }
      });
    },
    updateProduct(context) {
      // 處理中提示
      context.commit("LOADING", true, { root: true });
      // Create
      if (context.state.isNewProduct) {
        postAPI_createProduct({ Product: context.state.tempProduct }).then(
          response => {
            if (response.data.success) {
              context.dispatch("getProducts", { page: 1 }, { root: true });
            } else {
              context.dispatch("getProducts", { page: 1 }, { root: true });
              console.log("新增失敗");
            }
          }
        );
      }
      // Update
      else {
        putAPI_updateProduct({ Product: context.state.tempProduct }).then(
          response => {
            if (response.data.success) {
              context.dispatch("getProducts", { page: 1 }, { root: true });
            } else {
              context.dispatch("getProducts", { page: 1 }, { root: true });
              console.log("更新失敗");
            }
          }
        );
      }
    },
    uploadFile(context, value) {
      return new Promise((resolve, reject) => {
        // 將 file 放到 formData裡面
        const formData = new FormData();
        formData.append("file-to-upload", value.uploadFile);
        // 將 formData 上傳到後端
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
        // 處理中提示
        context.commit("STATUS_FILEUPLOADING", true);
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(
            response => {
              console.log(response.data);
              context.commit("STATUS_FILEUPLOADING", false);
              // 上傳成功取得後端回傳的網址，綁定到ViewModel上面並顯示於頁面
              if (response.data.success) {
                context.commit("TEMPPRODUCT_IMAGEURL", response.data.imageUrl);
              }
              resolve(response);
            },
            error => {
              reject(error);
            }
          );
      });
    },
    updateIsNewProduct(context, value) {
      context.commit("IS_NEW_PRODUCT", value);
    },
    updateTempProduct(context, value) {
      context.commit("TEMPPRODUCT", value);
    },
    updateStatusFileUploading(context, value) {
      context.commit("STATUS_FILEUPLOADING", value);
    },
    updateTempProductTitle(context, value) {
      context.commit("TEMPPRODUCT_TITLE", value);
    },
    updateTempProductCategory(context, value) {
      context.commit("TEMPPRODUCT_CATEGORY", value);
    },
    updateTempProductUnit(context, value) {
      context.commit("TEMPPRODUCT_UNIT", value);
    },
    updateTempProductOriginPrice(context, value) {
      context.commit("TEMPPRODUCT_ORIGIN_PRICE", value);
    },
    updateTempProductPrice(context, value) {
      context.commit("TEMPPRODUCT_PRICE", value);
    },
    updateTempProductNum(context, value) {
      context.commit("TEMPPRODUCT_NUM", value);
    },
    updateTempProductDescription(context, value) {
      context.commit("TEMPPRODUCT_DESCRIPION", value);
    },
    updateTempProductContent(context, value) {
      context.commit("TEMPPRODUCT_CONTENT", value);
    },
    updateTempProductIsEnabled(context, value) {
      context.commit("TEMPPRODUCT_IS_ENABLED", value);
    },
    updateTempProductImageUrl(context, value) {
      context.commit("TEMPPRODUCT_IMAGEURL", value);
    }
  },
  mutations: {
    IS_NEW_PRODUCT(state, payload) {
      state.isNewProduct = payload;
    },
    TEMPPRODUCT(state, payload) {
      state.tempProduct = payload;
    },
    TEMPPRODUCT_TITLE(state, payload) {
      state.tempProduct.title = payload;
    },
    TEMPPRODUCT_CATEGORY(state, payload) {
      state.tempProduct.category = payload;
    },
    TEMPPRODUCT_UNIT(state, payload) {
      state.tempProduct.unit = payload;
    },
    TEMPPRODUCT_ORIGIN_PRICE(state, payload) {
      state.tempProduct.originPrice = parseFloat(payload);
    },
    TEMPPRODUCT_PRICE(state, payload) {
      state.tempProduct.price = parseFloat(payload);
    },
    TEMPPRODUCT_NUM(state, payload) {
      state.tempProduct.num = parseInt(payload, 10);
    },
    TEMPPRODUCT_DESCRIPION(state, payload) {
      state.tempProduct.description = payload;
    },
    TEMPPRODUCT_CONTENT(state, payload) {
      state.tempProduct.content = payload;
    },
    TEMPPRODUCT_IS_ENABLED(state, payload) {
      state.tempProduct.isEnabled = payload;
    },
    TEMPPRODUCT_IMAGEURL(state, payload) {
      Vue.set(state.tempProduct, "imageUrl", payload);
    },
    STATUS_FILEUPLOADING(state, payload) {
      state.status.fileUploading = payload;
    }
  },
  getters: {
    isNewProduct(state) {
      return state.isNewProduct;
    },
    tempProduct(state) {
      return state.tempProduct;
    },
    tempProduct_title(state) {
      return state.tempProduct.title;
    },
    tempProduct_category(state) {
      return state.tempProduct.category;
    },
    tempProduct_unit(state) {
      return state.tempProduct.unit;
    },
    tempProduct_origin_price(state) {
      return state.tempProduct.originPrice;
    },
    tempProduct_price(state) {
      return state.tempProduct.price;
    },
    tempProduct_num(state) {
      return state.tempProduct.num;
    },
    tempProduct_description(state) {
      return state.tempProduct.description;
    },
    tempProduct_content(state) {
      return state.tempProduct.content;
    },
    tempProduct_is_enabled(state) {
      return state.tempProduct.isEnabled;
    },
    tempProduct_imageUrl(state) {
      return state.tempProduct.imageUrl;
    },
    status_fileUploading(state) {
      return state.status.fileUploading;
    }
  }
};
