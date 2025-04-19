import { useRapidResponseStore } from '@/stores/rapidResponse'
import type { RapidResponse } from '@/types/rapidResponse'
import { ref } from 'vue'

export function useRapidResponse() {
  const rapidResponseStore = useRapidResponseStore()

  const searchQuery = ref('')
  const editingId = ref<string | null>(null)
  const editedName = ref('')
  const showModal = ref(false)

  const startEditName = (id: string, currentName: string) => {
    editingId.value = id
    editedName.value = currentName
  }

  const saveName = (id: string) => {
    if (editedName.value.trim() === '') return
    rapidResponseStore.updateResponseName(id, editedName.value)
    cancelEdit()
  }

  const cancelEdit = () => {
    editingId.value = null
    editedName.value = ''
  }

  const handleKeyDown = (event: KeyboardEvent, id: string) => {
    if (event.key === 'Enter') {
      saveName(id)
    } else if (event.key === 'Escape') {
      cancelEdit()
    }
  }

  const deleteItem = (id: string) => {
    rapidResponseStore.markAsEliminated(id)
  }

  const openNewResponseModal = () => {
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const createNewResponse = (response: Omit<RapidResponse, 'id'>) => {
    rapidResponseStore.createNewResponse(response)
    closeModal()
  }

  const handleNameUpdate = (id: string, newName: string) => {
    rapidResponseStore.updateResponseName(id, newName)
  }

  return {
    responseList: rapidResponseStore.responseList,
    sortedResponses: () => rapidResponseStore.filteredResponses(searchQuery.value),

    searchQuery,
    editingId,
    editedName,
    showModal,

    startEditName,
    saveName,
    cancelEdit,
    handleKeyDown,
    deleteItem,
    openNewResponseModal,
    closeModal,
    createNewResponse,
    handleNameUpdate,
  }
}
