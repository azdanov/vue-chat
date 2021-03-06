import firebase from "firebase";

export default {
  state: {
    authId: null,
    unsubscribeAuth: null
  },

  mutations: {
    setAuthId(state, { id }) {
      state.authId = id;
    },

    setUnsubscribeAuth(state, unsubscribe) {
      state.unsubscribeAuth = unsubscribe;
    }
  },

  actions: {
    initAuthObserver({ dispatch, commit, state }) {
      return new Promise(async resolve => {
        if (state.authId) {
          console.log("🕵🏻‍♂️️", state.authId);
          const user = await dispatch("fetchAuthUser", { id: state.authId });

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

          resolve(await dispatch("fetchAuthUser"));
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

    async signInWithGithub({ dispatch }) {
      const provider = new firebase.auth.GithubAuthProvider();
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
      console.log("🚪");
      const id = firebase.auth().currentUser.uid;

      await Promise.all([
        firebase.auth().signOut(),
        firebase
          .database()
          .ref("users")
          .child(id)
          .update({ online: false })
      ]);

      commit("setAuthId", { id: null });
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
              commit("setAuthId", { id });
            } else {
              commit("setAuthId", { id: null });
            }

            resolve(user);
          });
      });
    }
  }
};
