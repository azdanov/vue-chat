<template>
  <div class="my-4 text-grey-darkest flex justify-end">
    <div v-if="guest">
      <RouterLink
        :to="{ name: 'home' }"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark"
        >Home</RouterLink
      ><RouterLink
        :to="{ name: 'about' }"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark"
        >About</RouterLink
      ><RouterLink
        :to="{ name: 'login' }"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark"
        >Login</RouterLink
      >
    </div>
    <div v-else>
      <RouterLink
        :to="{ name: 'chat' }"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark"
        >Chat</RouterLink
      ><RouterLink
        :to="{ name: 'about' }"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark"
        >About</RouterLink
      ><RouterLink
        :to="{ name: 'logout' }"
        class="text-grey-darkest hover:bg-grey-lightest p-2 no-underline"
        exact-active-class="text-green-dark"
        >Logout</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapState({ auth: state => state.auth.authId }),
    guest() {
      return !this.auth;
    }
  }
};
</script>

<style></style>
