<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.style"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.content }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    removeMessage(num) {
      this.$store.dispatch("alertMoules/removeMessage", {
        num: num
      });
    }
  },
  computed: {
    messages() {
      return this.$store.getters["alertMoules/messages"];
    }
  },
  created() {}
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
