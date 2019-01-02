<template>
  <div class="shadow-md max-w-sm m-auto mt-8 p-4 pb-8 rounded">
    <h2 class="text-4xl">Login</h2>

    <div class="flex flex-col w-48 m-auto">
      <button
        class="bg-red hover:bg-red-dark text-white font-bold py-3 px-5 rounded-full text-lg shadow no-underline mt-6"
        @click="loginGoogle"
      >
        with Google
      </button>
      <button
        class="bg-grey-darkest hover:bg-black text-white font-bold py-3 px-5 rounded-full text-lg shadow no-underline mt-6"
        @click="loginGithub"
      >
        with Github
      </button>
    </div>
  </div>
</template>

<script>
import nativeToast from "native-toast";
import { mapActions } from "vuex";
export default {
  name: "Login",
  created() {
    this.$emit("ready");
  },
  methods: {
    ...mapActions({
      signInWithGoogle: "signInWithGoogle",
      signInWithGithub: "signInWithGithub"
    }),
    loginGoogle() {
      this.signInWithGoogle().then(this.redirect);
    },
    loginGithub() {
      this.signInWithGithub().then(this.redirect);
    },
    redirect() {
      nativeToast({
        message: "Logged in!",
        position: "south-east",
        timeout: 3000,
        type: "success"
      });
      this.$router.push({ name: "chat" });
    }
  }
};
</script>

<style scoped></style>
