<template>
  <div
    class="container px-1 text-black antialiased font-sans text-center h-screen overflow-hidden"
  >
    <NavBar></NavBar>
    <RouterView />
  </div>
</template>

<script>
// import NProgress from "nprogress";
import NavBar from "@/components/TheNavBar";

export default {
  components: {
    NavBar
  },
};
</script>

<style>
/*@import "~nprogress/nprogress.css";*/
@import "~native-toast/dist/native-toast.css";
@import "./styles/tailwind.css";
</style>
