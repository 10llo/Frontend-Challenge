import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // Sidebar state
  const isSidebarCollapsed = ref(false)

  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  // Modal state
  const activeModal = ref<string | null>(null)

  function openModal(modalId: string) {
    activeModal.value = modalId
  }

  function closeModal() {
    activeModal.value = null
  }

  // Editing state
  const editingItemId = ref<string | null>(null)
  const editedValue = ref('')

  function startEditing(id: string, initialValue: string) {
    editingItemId.value = id
    editedValue.value = initialValue
  }

  function stopEditing() {
    editingItemId.value = null
    editedValue.value = ''
  }

  return {
    isSidebarCollapsed,
    toggleSidebar,

    activeModal,
    openModal,
    closeModal,

    editingItemId,
    editedValue,
    startEditing,
    stopEditing,
  }
})
