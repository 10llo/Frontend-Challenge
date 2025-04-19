<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppButton from '@/components/ui/Button.vue'
import InputField from '@/components/ui/InputField.vue'
import RapidResponseItem from '@/components/rapid-response/RapidResponseItem.vue'
import SignatureRequiredModal from '@/components/ui/SignatureRequiredModal.vue'
import { useRapidResponse } from '@/composables/useRapidResponse'
import { useAppStyles } from '@/composables/useAppStyles'

defineOptions({
  name: 'RapidResponseList',
})

const {
  searchQuery,
  sortedResponses,
  showModal,
  openNewResponseModal,
  closeModal,
  handleNameUpdate,
  deleteItem,
} = useRapidResponse()

const { scrollbarClass } = useAppStyles()

const filteredResponses = computed(() => sortedResponses())

const goToSignatures = () => {
  console.log('Navigate to signatures page')
  closeModal()
}

// Use a ref to focus the search field on mount
const searchInput = ref<InstanceType<typeof InputField> | null>(null)

onMounted(() => {
  setTimeout(() => {
    if (searchInput.value) {
      searchInput.value.focus()
    }
  }, 100)
})
</script>

<template>
  <div class="flex flex-col h-full w-full bg-gray-100">
    <!-- Header with Title, Search and Buttons -->
    <div class="p-6 pb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-gray-700">Rapid Response</h1>

      <div class="flex items-center space-x-4">
        <!-- Templates Button -->
        <AppButton variant="secondary" icon="design_services"> Signatures and templates </AppButton>

        <!-- New Rapid Response Button -->
        <AppButton @click="openNewResponseModal" icon="add"> New Rapid Response </AppButton>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 px-6 pb-6 overflow-hidden">
      <!-- Main content container -->
      <div class="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-8 h-full">
        <!-- Logo -->
        <div class="flex justify-start">
          <img src="@/assets/logo.svg" alt="Company Logo" class="w-[196px] -ml-2" />
        </div>

        <!-- Status Title and Search -->
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-600">Status</h2>

          <!-- Search Bar -->
          <div class="relative w-[397px]">
            <InputField
              v-model="searchQuery"
              placeholder="Search Rapid Response"
              icon="search"
              ref="searchInput"
              aria-label="Search rapid responses"
            />
          </div>
        </div>

        <!-- Table Container -->
        <div class="flex flex-col gap-4 flex-1 overflow-hidden">
          <!-- Table Header -->
          <div class="flex items-center px-5 py-2 mb-2 text-xs text-gray-400 gap-10" v-once>
            <!-- Name Column -->
            <div class="w-[148px]">
              <span>Name</span>
            </div>

            <!-- Status Column -->
            <div class="w-[100px] pl-1">
              <span>Status</span>
            </div>

            <!-- Properties Column -->
            <div class="w-[100px]">
              <span>Properties</span>
            </div>

            <!-- Last Property Entry Column -->
            <div class="w-[148px]">
              <span>Last property entry</span>
            </div>

            <!-- Price Column -->
            <div class="w-[148px]">
              <span>Price</span>
            </div>

            <!-- Actions Column - empty space -->
            <div class="flex-1"></div>
          </div>

          <!-- Table Rows -->
          <div class="flex flex-col gap-4 overflow-y-auto pr-2" :class="scrollbarClass">
            <RapidResponseItem
              v-for="item in filteredResponses"
              :key="item.id"
              :item="item"
              @update:name="handleNameUpdate"
              @delete="deleteItem"
            />

            <!-- Empty state when no results are found -->
            <div
              v-if="filteredResponses.length === 0"
              class="flex flex-col items-center justify-center p-8 text-gray-400"
            >
              <span class="material-icons-outlined text-4xl mb-2">search_off</span>
              <p>No results found for "{{ searchQuery }}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Signature Required Modal Component -->
    <SignatureRequiredModal v-model="showModal" @go-to-signatures="goToSignatures" />
  </div>
</template>

<style scoped>
@import '@/assets/styles/scrollbar.css';

.bg-gray-100 {
  background-color: var(--gray-100);
}
</style>
