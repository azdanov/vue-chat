import Vue from "vue";
import firebase from "firebase";

export default {
  state: { users: {} },

  mutations: {
    setUser(state, { id, user }) {
      Vue.set(state.users, id, user);
    },

    deleteUser(state, { id }) {
      Vue.delete(state.users, id);
    }
  },

  actions: {
    createUser({ state, commit }, { id, email, name, avatar = null }) {
      return new Promise(resolve => {
        const user = {
          avatar,
          email,
          name,
          registeredAt: Math.floor(Date.now() / 1000)
        };

        firebase
          .database()
          .ref("users")
          .child(id)
          .set(user)
          .then(() => {
            commit("setUser", { id, user });
            resolve(state.users[id]);
          });
      });
    },

    deleteUser({ state, commit }, { id }) {
      console.log(id);
      return new Promise(resolve => {
        firebase
          .database()
          .ref("users")
          .child(id)
          .remove()
          .then(() => {
            commit("deleteUser", { id });
            resolve(state.users);
          });
      });
    },

    fetchUser: ({ state, commit }, { id }) => {
      console.log("🛩‍", id);
      return new Promise(resolve => {
        return firebase
          .database()
          .ref("users")
          .child(id)
          .once("value", snapshot => {
            commit("setUser", {
              id: snapshot.key,
              user: snapshot.val()
            });
            resolve(state.users[id]);
          });
      });
    },

    fetchAllUsers: ({ state, commit }) => {
      console.log("✈️‍‍‍", "all users");
      return new Promise(resolve => {
        return firebase
          .database()
          .ref("users")
          .once("value", snapshot => {
            const users = snapshot.val();
            Object.entries(users).forEach(userEntry => {
              const [id, user] = userEntry;
              commit("setUser", { id, user });
            });
            resolve(state.users);
          });
      });
    }
  }
};
