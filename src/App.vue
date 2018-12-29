<template>
  <div class="container text-black mx-auto antialiased font-sans text-center">
    <NavBar></NavBar>
    <RouterView />
  </div>
</template>

<script>
// import NProgress from "nprogress";
// import nativeToast from "native-toast";
import NavBar from "@/components/TheNavBar";

export default {
  components: {
    NavBar
  }
};
</script>

<style>
/* @import "~nprogress/nprogress.css"; */
/* @import "~native-toast/dist/native-toast.css"; */
@import "./styles/tailwind.css";
</style>
