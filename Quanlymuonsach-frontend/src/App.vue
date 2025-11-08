<template>
  <AppHeader />
  <div class="container app-container">
    <router-view />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "App",
  components: { AppHeader },
};
</script>

<style>
.app-container {
  max-width: 1200px;
  margin-top: 24px;
}
</style>
