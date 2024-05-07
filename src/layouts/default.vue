<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <header>
    <Header />
  </header>
  <div :class="$style.layoutContainer">


    <Sidebar />
    <RouterView />

  </div>


</template>

<style lang="scss" module>
.layoutContainer {
  display: flex;
  flex-direction: row;
 
}
</style>
