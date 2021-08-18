<template>
  <div>
    <Alert />
    <main class="form-signin">
      <form @submit.prevent="signin">
        <h1 class="h3 mb-3 fw-normal">請先登入</h1>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Account"
            v-model="admin_account"
          />
          <label for="floatingInput">Account</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="admin_password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
    </main>
  </div>
</template>

<script>
import Alert from "../AlertMessage.vue";

export default {
  name: "Login",
  components: {
    Alert
  },
  methods: {
    signin() {
      this.$store.dispatch("loginModules/signin").then(
        response => {
          if (response.data.success) {
            // 將後端回傳的 JWT 存入 localStorage
            localStorage.setItem("adminJWT", response.data.token);
            // 登入後先到產品清單頁面
            this.$router.push("/admin/products");
          } else {
            // 顯示錯誤訊息
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        },
        error => {
          console.log(error);
          this.$bus.$emit("message:push", "處理失敗", "danger");
        }
      );
    }
  },
  computed: {
    admin_account: {
      get() {
        return this.$store.getters["loginModules/admin_account"];
      },
      set(value) {
        this.$store.dispatch("loginModules/updateAdminAccount", value);
      }
    },
    admin_password: {
      get() {
        return this.$store.getters["loginModules/admin_password"];
      },
      set(value) {
        this.$store.dispatch("loginModules/updateAdminPassword", value);
      }
    }
  }
};
</script>

<style lang="" scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
