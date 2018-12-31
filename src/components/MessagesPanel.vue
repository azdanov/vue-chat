<template>
  <div class="bg-white shadow-md rounded pl-6 mr-2 py-4 max-h-outer">
    <p class="block text-grey-darker text-sm font-bold">Recent Messages</p>
    <div class="overflow-auto h-inner mt-2 pr-2">
      <div
        v-for="index in 1"
        :key="index"
        class="text-left flex leading-tight mt-1 mb-2"
      >
        <time :datetime="messageTime" class="mr-2 text-grey-darker"
          >{{ messageTime }} ({{ index }})</time
        >
        <p>
          <span class="font-semibold mr-2">Anton Zdanov</span>
          <span class="text-grey-darker">(akumael@gmail.com)</span>:<br />
          {{ message.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { fromUnixTime, format } from "date-fns";

export default {
  name: "MessagesPanel",
  data() {
    return {
      message: {
        time: 1546257122437,
        body:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, cum dolorum eaque eveniet iste itaque labore mollitia nisi pariatur sint vero, vitae voluptatibus. Doloribus illo provident quas repudiandae similique tempore!"
      }
    };
  },
  computed: {
    messageTime() {
      return format(fromUnixTime(this.message.time), "k:mm");
    }
  }
};
</script>

<style scoped>
.h-inner {
  max-height: 28.7rem;
}
.max-h-outer {
  min-height: 9rem;
  max-height: calc(100vh - 5.1rem);
}
</style>
