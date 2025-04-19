<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'AppHeader',
})

const balance = ref('$999.999')
</script>

<template>
  <header
    class="h-16 border-b border-gray-100 bg-white px-8 pl-8 flex items-center justify-between"
  >
    <!-- Search Inputs Section -->
    <div class="flex items-center gap-0 w-[560px]">
      <!-- Property Address Dropdown -->
      <div class="w-[280px]">
        <div
          class="w-full h-9 border border-gray-300 rounded-l-md flex items-center px-3 py-2 gap-3"
        >
          <span class="text-gray-300 truncate text-base font-normal">Property address</span>
          <span class="material-icons text-gray-300 ml-auto">arrow_drop_down</span>
        </div>
      </div>

      <!-- Property Search Input -->
      <div class="w-[280px]">
        <div
          class="w-full h-9 border border-gray-300 border-l-0 rounded-r-md flex items-center px-3 py-2 gap-2"
        >
          <span class="material-icons text-gray-400 text-lg">date_range</span>
          <span class="text-gray-300 truncate text-base font-normal">Search property address</span>
        </div>
      </div>
    </div>

    <!-- Actions and Profile Section -->
    <div class="flex items-center gap-4 h-16">
      <!-- Balance Button -->
      <button
        class="bg-green-600 text-white rounded-full h-8 px-2 flex items-center justify-center gap-2 shadow-sm"
      >
        <span class="text-base font-semibold">{{ balance }}</span>
        <div class="rounded-full bg-white w-5 h-5 flex items-center justify-center">
          <span class="material-icons text-green-600 text-xs">add</span>
        </div>
      </button>

      <!-- Notifications -->
      <div class="relative flex items-center justify-center">
        <span class="material-icons text-gray-600 text-lg">notifications</span>
        <div class="absolute top-0 right-0 w-1 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <!-- Profile -->
      <div
        class="w-8 h-8 rounded-full border border-blue-900 flex items-center justify-center text-blue-900 font-semibold text-base"
      >
        G
      </div>
    </div>
  </header>
</template>
