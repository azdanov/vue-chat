<template>
  <div class="flex flex-col py-4">
    <div>
      <img class="h-32" alt="Vue logo" src="../assets/vue.png" />
      <img class="h-32" alt="Firebase logo" src="../assets/firebase.png" />
    </div>
    <h1 class="pt-8">
      Welcome to <span class="text-green">Vue.js</span> +
      <span class="text-orange">Firebase</span> Chat App
    </h1>
    <div class="pt-12">
      <RouterLink
        to="/login"
        class="bg-green hover:bg-green-dark text-white font-bold py-3 px-5 rounded-full text-lg shadow no-underline"
        exact-active-class="text-orange-dark"
        >Login</RouterLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  created() {
    this.$emit("ready");
  }
};
</script>
