<template>
  <div v-if="show" class="my-4 text-grey-darkest flex justify-end">
    <div>
      <RouterLink
        to="/"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark shadow-inner"
        >Home</RouterLink
      ><RouterLink
        to="/about"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark shadow-inner"
        >About</RouterLink
      ><RouterLink
        to="/login"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark shadow-inner"
        >Login</RouterLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    show() {
      return ["/", "/about", "/login"].includes(this.$route.path);
    }
  }
};
</script>

<style></style>
