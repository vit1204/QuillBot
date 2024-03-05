<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue';

import LayoutDefault from './layouts/default.vue'
import LayoutAuth from './layouts/auth.vue'

const route = useRoute()

const currentLayout = computed(() => route.meta.layout || "default")

const layoutMap = {
  default: LayoutDefault,
  auth: LayoutAuth
}

const VNodeLayout = computed(() => layoutMap[currentLayout.value])
</script>

<template>
  <div class="mr-1">
    <Component :is="VNodeLayout">
      <RouterView />
    </Component>
  </div>
</template>

<style scoped>
</style>
