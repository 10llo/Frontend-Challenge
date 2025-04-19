<script setup lang="ts">
import { useUIStore } from '@/stores/ui'
import type { MenuItem } from '@/types'
import logoSvg from '@/assets/logo.svg'
import logoCollapsed from '@/assets/logo-collapsed.svg'
import { useAppStyles } from '@/composables/useAppStyles'

defineOptions({
  name: 'AppSidebar',
})

const uiStore = useUIStore()
const { scrollbarClass } = useAppStyles()

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: 'analytics', hasDropdown: false },
  { name: 'Buybox', icon: 'dashboard_customize', hasDropdown: true },
  { name: 'Properties', icon: 'house', hasDropdown: true },
  { name: 'Buyers', icon: 'monetization_on', hasDropdown: false },
  { name: 'Skip trace', icon: 'call', hasDropdown: false },
  { name: 'Fulfillment', icon: 'article', hasDropdown: true },
  { name: 'Integrations', icon: 'call_merge', hasDropdown: true },
  { name: 'Tools', icon: 'build', hasDropdown: true },
  { name: 'Payment', icon: 'credit_card', hasDropdown: true },
]

const bottomItems: MenuItem[] = [{ name: 'Settings', icon: 'settings', hasDropdown: true }]
</script>

<template>
  <aside
    class="h-screen border-r border-gray-200 bg-white flex flex-col relative transition-all duration-300 ease-in-out"
    :class="uiStore.isSidebarCollapsed ? 'w-20' : 'w-[229px]'"
  >
    <!-- Toggle Button  -->
    <button
      class="w-6 h-6 flex items-center justify-center rounded-full border-1 border-gray-400 bg-white absolute -right-3 top-5 z-10 overflow-hidden transition-transform duration-300"
      :class="{ 'rotate-180': !uiStore.isSidebarCollapsed }"
      @click="uiStore.toggleSidebar"
    >
      <span class="material-icons text-gray-400 text-xs scale-75">{{
        uiStore.isSidebarCollapsed ? 'menu' : 'menu_open'
      }}</span>
    </button>

    <!-- Logo Section -->
    <div class="flex items-center p-4" :class="{ 'justify-start': uiStore.isSidebarCollapsed }">
      <div v-if="!uiStore.isSidebarCollapsed" class="transition-opacity duration-300 ease-in-out">
        <img :src="logoSvg" alt="8020REi Logo" class="h-8" />
      </div>
      <div
        v-else
        class="flex items-center justify-center transition-opacity duration-300 ease-in-out"
      >
        <img :src="logoCollapsed" alt="8020REi Logo" class="h-8" />
      </div>
    </div>

    <!-- Menu Items -->
    <div class="flex-grow overflow-y-auto" :class="scrollbarClass">
      <nav>
        <ul>
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="px-4 h-12 flex items-center hover:bg-gray-50 cursor-pointer transition-all duration-300 overflow-hidden"
            :class="[
              { 'bg-gray-50': index === 0 },
              { 'justify-center': uiStore.isSidebarCollapsed },
            ]"
          >
            <div class="w-[30px] flex items-center justify-center shrink-0">
              <span class="material-icons text-gray-500 text-xl">{{ item.icon }}</span>
            </div>
            <div
              class="ml-3 overflow-hidden transition-all duration-300 ease-in-out max-w-[130px]"
              :class="uiStore.isSidebarCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'"
            >
              <span class="text-gray-600 text-sm">{{ item.name }}</span>
            </div>
            <span
              v-if="item.hasDropdown"
              class="material-icons text-gray-500 transition-all duration-300 shrink-0"
              :class="uiStore.isSidebarCollapsed ? 'text-xs absolute right-4' : 'ml-auto'"
              >{{ uiStore.isSidebarCollapsed ? 'arrow_right' : 'arrow_drop_down' }}</span
            >
          </li>
        </ul>
      </nav>
    </div>

    <!-- Bottom Section with transition -->
    <div class="p-2">
      <ul>
        <li
          v-for="(item, index) in bottomItems"
          :key="index"
          class="px-4 h-12 flex items-center hover:bg-gray-50 cursor-pointer transition-all duration-300 overflow-hidden"
          :class="{ 'justify-center': uiStore.isSidebarCollapsed }"
        >
          <div class="w-[30px] flex items-center justify-center shrink-0">
            <span class="material-icons text-gray-500 text-xl">{{ item.icon }}</span>
          </div>
          <div
            class="ml-3 overflow-hidden transition-all duration-300 ease-in-out max-w-[130px]"
            :class="uiStore.isSidebarCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'"
          >
            <span class="text-gray-600 text-sm">{{ item.name }}</span>
          </div>
          <span
            v-if="item.hasDropdown"
            class="material-icons text-gray-500 transition-all duration-300 shrink-0"
            :class="uiStore.isSidebarCollapsed ? 'text-xs absolute right-4' : 'ml-auto'"
          >
            {{ uiStore.isSidebarCollapsed ? 'arrow_right' : 'arrow_drop_down' }}
          </span>
        </li>
      </ul>

      <!-- Utility Icons -->
      <div
        class="my-4 transition-all duration-300"
        :class="{
          'flex flex-col items-start space-y-4 pl-2.5': uiStore.isSidebarCollapsed,
          'flex justify-end space-x-4 pr-4': !uiStore.isSidebarCollapsed,
        }"
      >
        <div
          class="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <span class="material-icons text-gray-500">library_books</span>
        </div>
        <div
          class="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <span class="material-icons text-gray-500">help</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@import '@/assets/styles/scrollbar.css';

.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
</style>
