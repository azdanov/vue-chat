<template>
  <div class="bg-white shadow-md rounded pl-8 py-4 max-h-outer">
    <p class="block text-grey-darker text-sm font-bold mb-2 mr-8">
      Users Online
    </p>
    <div class="h-inner overflow-auto">
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "UsersOnline",
  computed: {
    ...mapState({
      online: state => {
        return Object.entries(state.users.users)
          .filter(userEntry => !!userEntry[1].online)
          .reduce((accumulator, userEntry) => {
            const [id, user] = userEntry;

            accumulator[id] = user;

            return accumulator;
          }, {});
      }
    })
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
.h-inner {
  max-height: 17rem;
}
.max-h-outer {
  max-height: 20rem;
}
</style>
