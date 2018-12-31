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
import firebase from "firebase";
import { mapActions, mapMutations } from "vuex";
import MessagesPanel from "@/components/MessagesPanel";
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

    usersRef.on("child_changed", snapshot => {
      console.log("🧔🏻🔃", snapshot.key);

      this.storeUser({ id: snapshot.key, user: snapshot.val() });
    });

    usersRef.on("child_removed", snapshot => {
      console.log("🧔🏻🚪", snapshot.key);
      this.deleteUser({ id: snapshot.key });
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const currentUserRef = usersRef.child(user.uid);
        currentUserRef.update({ online: true });
        currentUserRef.onDisconnect().update({ online: false });
      }
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
    ...mapMutations(["storeUser", "deleteMessage"])
  }
};
</script>

<style scoped></style>
