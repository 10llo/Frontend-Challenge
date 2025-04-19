<script setup lang="ts">
import { computed } from 'vue'
import { useFocus } from '@/composables/useFocus'
import { useUIStore } from '@/stores/ui'
import type { RapidResponse } from '@/types/rapidResponse'
import UiBadge from '@/components/ui/Badge.vue'

defineOptions({
  name: 'RapidResponseItem',
})

interface Props {
  item: RapidResponse
}

const props = defineProps<Props>()
const uiStore = useUIStore()
const { vFocus } = useFocus()

const emit = defineEmits<{
  (e: 'update:name', id: string, name: string): void
  (e: 'delete', id: string): void
}>()

const isActive = computed(() => props.item.status === 'Active')
const badgeVariant = computed(() => (isActive.value ? 'success' : 'error'))
const isEditing = computed(() => uiStore.editingItemId === props.item.id)

const startEdit = () => {
  uiStore.startEditing(props.item.id, props.item.name)
}

const saveName = () => {
  if (uiStore.editedValue.trim() === '') return

  emit('update:name', props.item.id, uiStore.editedValue)
  uiStore.stopEditing()
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveName()
  } else if (event.key === 'Escape') {
    uiStore.stopEditing()
  }
}
</script>

<template>
  <div
    class="flex items-center px-5 py-4 border-2 border-gray-50 rounded-2xl bg-white gap-10"
    :class="{ 'opacity-70': !isActive }"
  >
    <div class="w-[148px] flex flex-col gap-2">
      <div
        v-if="!isEditing"
        class="text-sm font-semibold h-[28px] flex items-center"
        :class="isActive ? 'text-gray-700' : 'text-gray-400'"
      >
        {{ item.name }}
      </div>
      <input
        v-else
        v-model="uiStore.editedValue"
        @keydown="handleKeyDown"
        class="text-sm font-semibold text-gray-700 border border-gray-300 rounded px-2 h-[28px] w-full focus:outline-none focus:ring-1 focus:ring-blue-500 box-border"
        v-focus
      />
      <div class="text-[10px] text-gray-400">Last deploy {{ item.lastDeploy }}</div>
    </div>

    <div class="w-[100px]">
      <UiBadge :label="item.status" :variant="badgeVariant" />
    </div>

    <div
      class="w-[100px] text-sm font-semibold"
      :class="isActive ? 'text-gray-700' : 'text-gray-400'"
    >
      {{ item.properties }}
    </div>

    <div
      class="w-[148px] text-sm font-semibold"
      :class="isActive ? 'text-gray-700' : 'text-gray-400'"
    >
      {{ item.lastPropertyEntry }}
    </div>

    <div
      class="w-[148px] text-sm font-semibold"
      :class="isActive ? 'text-green-600' : 'text-gray-400'"
    >
      {{ item.price }}
    </div>

    <div v-if="isActive" class="flex-1 flex items-center justify-end gap-3 flex-wrap">
      <button
        v-if="!isEditing"
        @click="emit('delete', item.id)"
        class="w-6 h-6 border border-gray-300 rounded flex items-center justify-center shrink-0"
        title="Delete"
      >
        <span class="material-icons-outlined text-gray-600 text-xs">delete_outline</span>
      </button>

      <button
        v-if="!isEditing"
        @click="startEdit"
        class="h-6 px-2 border border-gray-300 rounded flex items-center justify-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
        title="Edit name"
      >
        <span class="material-icons-outlined text-gray-600 text-xs shrink-0">edit</span>
        <span class="text-xs text-gray-600 font-medium truncate">Edit name</span>
      </button>

      <button
        v-if="isEditing"
        @click="saveName"
        class="h-6 px-2 border border-gray-300 rounded flex items-center justify-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
        title="Save name"
      >
        <span class="material-icons-outlined text-gray-600 text-xs shrink-0">save</span>
        <span class="text-xs text-gray-600 font-medium truncate">Save name</span>
      </button>
    </div>
    <div v-else class="flex-1"></div>
  </div>
</template>
