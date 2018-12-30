<template>
  <div class="w-full max-w-xs">
    <NewMessage @newMessage="submit"></NewMessage>
    <hr class="my-4" />
    <UsersOnline></UsersOnline>
  </div>
</template>

<script>
import NewMessage from "@/components/NewMessage";
import UsersOnline from "@/components/UsersOnline";

export default {
  name: "Chat",
  components: { UsersOnline, NewMessage },
  methods: {
    submit(message) {
      console.log("✍🏻", message);
    }
  }
};
</script>

<style scoped></style>
