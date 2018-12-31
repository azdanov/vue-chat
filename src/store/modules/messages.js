import Vue from "vue";
import firebase from "firebase";

export default {
  state: { messages: {} },

  mutations: {
    storeMessage(state, { id, message }) {
      Vue.set(state.messages, id, message);
    },
    deleteMessage(state, { id }) {
      Vue.delete(state.messages, id);
    }
  },

  actions: {
    createMessage({ rootState }, { text, time }) {
      return new Promise(resolve => {
        return firebase
          .database()
          .ref("messages")
          .push({
            user: rootState.auth.authId,
            text,
            time
          })
          .then(() => resolve());
      });
    },

    fetchMessage: ({ state, commit }, { id }) => {
      console.log("✍🏻‍", id);
      return new Promise(resolve => {
        return firebase
          .database()
          .ref("messages")
          .child(id)
          .once("value", snapshot => {
            commit("storeMessage", {
              id: snapshot.key,
              message: snapshot.val()
            });
            resolve(state.messages[id]);
          });
      });
    },

    fetchAllMessages({ commit, state }) {
      console.log("📮️‍‍‍", "all messages");
      return new Promise(resolve => {
        return firebase
          .database()
          .ref("messages")
          .once("value", snapshot => {
            const messagesObj = snapshot.val();
            if (!messagesObj) {
              return resolve(null);
            }
            const messages = Object.entries(messagesObj).reverse();
            messages.forEach(messageEntry => {
              const [id, message] = messageEntry;
              commit("storeMessage", { id, message });
            });
            return resolve(state.messages);
          });
      });
    }
  }
};
