<template>
  <form class="bg-white shadow-md rounded px-8 py-4 max-h-72 overflow-auto">
    <p class="block text-grey-darker text-sm font-bold mb-2">Users Online</p>
    <div class="flex flex-col text-left">
      <div
        v-for="(user, key) in online"
        :key="key"
        class="flex items-center justify-start my-2"
      >
        <img
          class="w-10 h-10 rounded-full mr-4"
          :src="user.avatar"
          :alt="`Avatar of ${user.name}`"
        />
        <div class="text-sm">
          <p class="text-black leading-none">{{ user.name }}</p>
          <p class="text-grey-dark">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "UsersOnline",
  computed: {
    ...mapState({ online: state => state.users.users })
  },
  created() {
    this.fetchAllUsers();
  },
  methods: {
    ...mapActions(["fetchAllUsers"])
  }
};
</script>

<style scoped>
.max-h-72 {
  max-height: 20rem;
}
</style>
