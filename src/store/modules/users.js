import Vue from "vue";
import firebase from "firebase";

export default {
  state: { users: {} },
  mutations: {
    setUser(state, { id, user }) {
      Vue.set(state.users, id, user);
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
    }
  }
};
