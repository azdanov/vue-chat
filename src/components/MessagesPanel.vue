<template>
  <div class="bg-white shadow-md rounded pl-6 mr-2 py-4 max-h-outer">
    <p class="block text-grey-darker text-sm font-bold">Recent Messages</p>
    <div class="overflow-auto h-inner mt-2 pr-2">
      <div v-if="messages.length === 0" class="mt-6 text-2xl">
        Currently no messages are available.
      </div>
      <div
        v-for="message in messages"
        :key="message.id"
        class="text-left flex items-baseline leading-tight mt-1 mb-2"
      >
        <time class="w-10 mr-3 text-right text-grey-darker text-sm">
          {{ message.time | formatTime }}
        </time>
        <p>
          <span class="font-semibold mr-2">{{ user(message.user).name }}</span>
          <span class="text-grey-darker">({{ user(message.user).email }})</span
          >: <br />
          {{ message.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { format } from "date-fns";

export default {
  name: "MessagesPanel",
  filters: {
    formatTime(value) {
      return format(new Date(value), "k:mm");
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.users,
      messages: state =>
        Object.entries(state.messages.messages)
          .reverse()
          .map(message => ({ ...message[1], id: message[0] }))
    })
  },
  created() {
    this.fetchAllMessages().then(() => {
      const users = this.messages.reduce(
        (acc, message) => [...acc, message.user],
        []
      );
      this.fetchUsers(users);
    });
  },
  methods: {
    ...mapActions(["fetchAllMessages", "fetchUsers"]),
    user(id) {
      // FIXME: Race condition where user is unavailable
      return this.users[id] ? this.users[id] : "";
    }
  }
};
</script>

<style scoped>
.h-inner {
  min-height: 4rem;
  max-height: 28.7rem;
}
.max-h-outer {
  min-height: 8rem;
  max-height: calc(100vh - 5.1rem);
}
</style>
