<template>
  <div>
    <h2 class="pt-2">Login</h2>

    <button
      class="bg-red hover:bg-red-dark text-white font-bold py-3 px-5 rounded-full text-lg shadow no-underline mt-6"
      @click="login"
    >
      with Google
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  methods: {
    ...mapActions({
      signInWithGoogle: "signInWithGoogle"
    }),
    login() {
      this.signInWithGoogle().then(() => this.$router.push({ name: "chat" }));
    }
  }
};
</script>

<style scoped></style>
