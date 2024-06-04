<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <header>
    <Header />
  </header>
  <div :class="$style.layoutContainer">


    <Sidebar />
    <div :class="$style.containerLayout">

      <RouterView />
 
      <div :class="$style.footerLayout">
        <Footer />

      </div>

    </div>



  </div>



</template>

<style lang="scss" module>
.layoutContainer {
  display: flex;
  flex-direction: row;
}




</style>
