<script setup lang="ts">
import { COLORS } from '@/constants/colors'
import '@/assets/styles/scrollbar.css'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

:root {
  --blue-900: v-bind('COLORS.BLUE_900');
  --gray-50: v-bind('COLORS.GRAY_50');
  --gray-100: v-bind('COLORS.GRAY_100');
  --gray-400: v-bind('COLORS.GRAY_400');
  --gray-600: v-bind('COLORS.GRAY_600');
  --gray-700: v-bind('COLORS.GRAY_700');
  --green-600: v-bind('COLORS.GREEN_600');
  --green-800: v-bind('COLORS.GREEN_800');
  --red-800: v-bind('COLORS.RED_800');
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: var(--gray-600);
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.material-icons,
.material-icons-outlined {
  font-feature-settings: 'liga';
}
</style>
