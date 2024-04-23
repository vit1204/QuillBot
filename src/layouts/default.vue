<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <header>
    <Header />
  </header>
  <RouterView />
  <Sidebar />
 
</template>
