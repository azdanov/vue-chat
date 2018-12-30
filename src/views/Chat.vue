<template>
  <div class="w-full max-w-xs">
    <NewMessage @newMessage="submit"></NewMessage>
    <hr class="my-4" />
    <UsersOnline></UsersOnline>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import NewMessage from "@/components/NewMessage";
import UsersOnline from "@/components/UsersOnline";

const usersRef = firebase.database().ref("users");

export default {
  name: "Chat",
  components: { UsersOnline, NewMessage },
  created() {
    usersRef.on("child_added", snapshot => {
      console.log("🧔🏻 online", snapshot.key);
      this.fetchUser({ id: snapshot.key });
    });

    usersRef.on("child_removed", snapshot => {
      console.log("🧔🏻 offline", snapshot.key);
      this.deleteUser({ id: snapshot.key });
    });
  },
  beforeDestroy() {
    usersRef.off("child_added");
    usersRef.off("child_removed");
  },
  methods: {
    ...mapActions(["fetchUser", "deleteUser"]),
    submit(message) {
      console.log("✍🏻", message);
    }
  }
};
</script>

<style scoped></style>
