import firebase from "firebase";

export default {
  state: {
    authId: null,
    unsubscribeAuth: null
  },
  mutations: {
    setAuthId(state, id) {
      state.authId = id;
    },
    setUnsubscribeAuth(state, unsubscribe) {
      state.unsubscribeAuth = unsubscribe;
    }
  },
  actions: {
    initAuthentication({ dispatch, commit, state }) {
      return new Promise(async resolve => {
        if (state.authId) {
          console.log("🕵🏻‍♂️️", state.authId);
          const user = await dispatch("fetchUser", { id: state.authId });

          return resolve(user);
        }

        if (state.unsubscribeAuth) {
          state.unsubscribeAuth();
        }

        const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
          console.log("👮🏻‍♂️ authStateChanged", user);
          if (!user) {
            return resolve(null);
          }

          const dbUser = await dispatch("fetchAuthUser");
          resolve(dbUser);
        });
        commit("setUnsubscribeAuth", unsubscribe);
      });
    },

    async signInWithGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await firebase.auth().signInWithPopup(provider);

      return firebase
        .database()
        .ref("users")
        .child(user.uid)
        .once("value", async snapshot => {
          if (snapshot.exists()) {
            return;
          }

          await dispatch("createUser", {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL
          });
          dispatch("fetchAuthUser");
        });
    },

    async signOut({ commit }) {
      await firebase.auth().signOut();
      commit("setAuthId", null);
    },

    fetchAuthUser({ dispatch, commit }) {
      const id = firebase.auth().currentUser.uid;

      return new Promise(resolve => {
        return firebase
          .database()
          .ref("users")
          .child(id)
          .once("value", async snapshot => {
            if (!snapshot.exists()) {
              resolve(null);
            }

            const user = await dispatch("fetchUser", { id });

            if (user) {
              commit("setAuthId", id);
            } else {
              commit("setAuthId", null);
            }

            resolve(user);
          });
      });
    }
  }
};
