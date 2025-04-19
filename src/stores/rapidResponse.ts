import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RapidResponse } from '@/types/rapidResponse'

export const useRapidResponseStore = defineStore('rapidResponse', () => {
  const responseList = ref<RapidResponse[]>([
    {
      id: '1',
      name: 'RapidR_name 01',
      status: 'Active',
      properties: 50,
      lastPropertyEntry: '01-15-2024',
      price: '$20.0',
      lastDeploy: '01-15-2024',
    },
    {
      id: '2',
      name: 'RapidR_name 02',
      status: 'Active',
      properties: 50,
      lastPropertyEntry: '01-15-2024',
      price: '$20.0',
      lastDeploy: '01-15-2024',
    },
    {
      id: '3',
      name: 'RapidR_name 03',
      status: 'Active',
      properties: 50,
      lastPropertyEntry: '01-15-2024',
      price: '$20.0',
      lastDeploy: '01-15-2024',
    },
    {
      id: '4',
      name: 'RapidR_name 04',
      status: 'Active',
      properties: 50,
      lastPropertyEntry: '01-15-2024',
      price: '$20.0',
      lastDeploy: '01-15-2024',
    },
    {
      id: '5',
      name: 'RapidR_name 05',
      status: 'Active',
      properties: 50,
      lastPropertyEntry: '01-15-2024',
      price: '$20.0',
      lastDeploy: '01-15-2024',
    },
    {
      id: '6',
      name: 'RapidR_name 06',
      status: 'Eliminated',
      properties: 50,
      lastPropertyEntry: '01-15-2024',
      price: '$20.0',
      lastDeploy: '01-15-2024',
    },
  ])

  // Sort responses by status
  const getSortedResponses = computed(() => {
    return [...responseList.value].sort((a, b) => {
      if (a.status === 'Active' && b.status === 'Eliminated') return -1
      if (a.status === 'Eliminated' && b.status === 'Active') return 1
      return 0
    })
  })

  const filteredResponses = (query: string) => {
    return getSortedResponses.value.filter(
      (item) => query === '' || item.name.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Actions
  function updateResponseName(id: string, newName: string) {
    if (newName.trim() === '') return

    const index = responseList.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      responseList.value[index].name = newName.trim()
    }
  }

  function markAsEliminated(id: string) {
    const index = responseList.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      responseList.value[index].status = 'Eliminated'
    }
  }

  function createNewResponse(response: Omit<RapidResponse, 'id'>) {
    const newId = (Math.max(...responseList.value.map((r) => parseInt(r.id))) + 1).toString()

    responseList.value.push({
      id: newId,
      ...response,
    })

    return newId
  }

  return {
    responseList,
    getSortedResponses,
    filteredResponses,
    updateResponseName,
    markAsEliminated,
    createNewResponse,
  }
})
