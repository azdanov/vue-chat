import Vue from "vue";
import firebase from "firebase";

export default {
  state: { users: {} },

  mutations: {
    storeUser(state, { id, user }) {
      Vue.set(state.users, id, user);
    },

    deleteUser(state, { id }) {
      Vue.delete(state.users, id);
    }
  },

  actions: {
    createUser({ state, commit }, { id, email, name, avatar = null }) {
      console.log("👶🏻", id);
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
            commit("storeUser", { id, user });
            resolve(state.users[id]);
          });
      });
    },

    deleteUser({ state, commit }, { id }) {
      console.log("🧔🏻🗑", id);
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
            commit("storeUser", {
              id: snapshot.key,
              user: snapshot.val()
            });
            resolve(state.users[id]);
          });
      });
    },

    fetchUsers: ({ dispatch }, ids) => {
      console.log("🛩🛩🛩‍", ids);
      ids = Array.isArray(ids) ? ids : Object.keys(ids);
      return Promise.all(ids.map(id => dispatch("fetchUser", { id })));
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
              commit("storeUser", { id, user });
            });
            resolve(state.users);
          });
      });
    }
  }
};
