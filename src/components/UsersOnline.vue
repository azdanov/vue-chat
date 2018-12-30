<template>
  <form class="bg-white shadow rounded px-8 py-4">
    <p class="block text-grey-darker text-sm font-bold mb-2">Users Online</p>
    <div class="flex flex-col text-left">
      <div class="flex items-center justify-start my-2">
        <img
          class="w-10 h-10 rounded-full mr-4"
          src="http://i.pravatar.cc/300?img=4"
          alt="Avatar of Dr. Johannes Sölzer"
        />
        <div class="text-sm">
          <p class="text-black leading-none">Dr. Johannes Sölzer</p>
          <p class="text-grey-dark">benjaminpons@tessier.fr</p>
        </div>
      </div>
      <div class="flex items-center justify-start my-2">
        <img
          class="w-10 h-10 rounded-full mr-4"
          src="http://i.pravatar.cc/300?img=3"
          alt="Avatar of Jonathan Reinink"
        />
        <div class="text-sm">
          <p class="text-black leading-none">Jonathan Reinink</p>
          <p class="text-grey-dark">luis03@pujadas.com</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "UsersOnline"
};
</script>

<style scoped></style>
