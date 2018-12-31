<template>
  <div class="flex w-full h-full">
    <div class="w-full max-w-xs mr-4">
      <NewMessage @newMessage="createMessage"></NewMessage>
      <hr class="my-4" />
      <UsersOnline></UsersOnline>
    </div>
    <div class="w-full"><MessagesPanel></MessagesPanel></div>
  </div>
</template>

<script>
import MessagesPanel from "@/components/MessagesPanel";
import { mapActions, mapMutations } from "vuex";
import firebase from "firebase";
import NewMessage from "@/components/NewMessage";
import UsersOnline from "@/components/UsersOnline";

const usersRef = firebase.database().ref("users");
const messagesRef = firebase.database().ref("messages");

export default {
  name: "Chat",
  components: { MessagesPanel, UsersOnline, NewMessage },
  created() {
    messagesRef.on("child_added", snapshot => {
      console.log("📨👋🏻", snapshot.key);
      this.fetchMessage({ id: snapshot.key });
    });

    messagesRef.on("child_removed", snapshot => {
      console.log("📨🚪", snapshot.key);
      this.deleteMessage({ id: snapshot.key });
    });

    usersRef.on("child_added", snapshot => {
      console.log("🧔🏻👋🏻", snapshot.key);
      this.fetchUser({ id: snapshot.key });
    });

    usersRef.on("child_removed", snapshot => {
      console.log("🧔🏻🚪", snapshot.key);
      this.deleteUser({ id: snapshot.key });
    });
  },
  beforeDestroy() {
    messagesRef.off("child_added");
    messagesRef.off("child_removed");
    usersRef.off("child_added");
    usersRef.off("child_removed");
  },
  methods: {
    ...mapActions(["fetchUser", "createMessage", "fetchMessage"]),
    ...mapMutations(["deleteUser", "deleteMessage"])
  }
};
</script>

<style scoped></style>
