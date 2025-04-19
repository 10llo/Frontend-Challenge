<script setup lang="ts">
import AppSidebar from '@/components/layout/Sidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import RapidResponseList from '@/components/rapid-response/RapidResponseList.vue'
import { useAppStyles } from '@/composables/useAppStyles'

defineOptions({
  name: 'RapidResponseView',
})

const { scrollbarClass } = useAppStyles()
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <AppSidebar />

    <div class="flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 overflow-auto" :class="scrollbarClass">
        <RapidResponseList />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
