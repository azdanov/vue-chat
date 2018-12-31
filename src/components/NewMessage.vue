<template>
  <form class="bg-white shadow-md rounded px-8 py-4" @submit.prevent="submit">
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="message"
      >
        New Message
      </label>
      <textarea
        id="message"
        v-model="message"
        class="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline resize-none"
        placeholder="Message"
      ></textarea>
    </div>
    <div class="flex justify-around">
      <button
        class="bg-grey-dark hover:bg-grey-darker text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="reset"
      >
        Reset
      </button>
      <button
        class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Send
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewMessage",
  data() {
    return { message: "" };
  },
  methods: {
    submit() {
      this.$emit("newMessage", this.message);
      this.message = "";
    }
  }
};
</script>

<style scoped></style>
