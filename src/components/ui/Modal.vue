<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from 'vue'

defineOptions({
  name: 'AppModal',
})

interface Props {
  modelValue: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnClickOutside?: boolean
  hideCloseButton?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnClickOutside: true,
  hideCloseButton: false,
  id: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const modalRef = ref<HTMLDivElement | null>(null)
const modalContentRef = ref<HTMLDivElement | null>(null)
const modalId = computed(() => props.id || `modal-${Math.random().toString(36).substr(2, 9)}`)

// Compute the width class based on the size prop
const widthClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-[400px]'
    case 'md':
      return 'w-[500px]'
    case 'lg':
      return 'w-[600px]'
    case 'xl':
      return 'w-[800px]'
    default:
      return 'w-[500px]'
  }
})

// Handle modal closing
const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Register keyboard event handlers
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

// Handle clicking outside the modal
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.closeOnClickOutside &&
    modalRef.value &&
    !modalRef.value.contains(event.target as Node)
  ) {
    close()
  }
}

// Trap focus within the modal when open
const handleTabKey = (event: KeyboardEvent) => {
  if (!modalContentRef.value || event.key !== 'Tab') return

  const focusableElements = modalContentRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus()
      event.preventDefault()
    }
  }
}

// Set body overflow when modal opens/closes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
      nextTick(() => {
        // Focus the first focusable element in the modal
        const firstFocusable = modalContentRef.value?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) as HTMLElement

        if (firstFocusable) {
          firstFocusable.focus()
        }
      })
    } else {
      document.body.style.overflow = ''
    }
  },
)

// Set up and clean up event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('keydown', handleTabKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.removeEventListener('keydown', handleTabKey)
  document.body.style.overflow = '' // Ensure we reset the overflow if component is destroyed
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="handleClickOutside"
      :id="modalId"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`${modalId}-title`"
    >
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 transition-opacity"></div>

        <!-- Modal -->
        <div
          ref="modalRef"
          class="relative rounded-lg bg-white shadow-xl transition-all"
          :class="widthClass"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-700" :id="`${modalId}-title`">
              {{ title }}
            </h3>
            <button
              v-if="!hideCloseButton"
              type="button"
              class="rounded-full p-1 hover:bg-gray-100 transition-colors"
              @click="close"
              aria-label="Close modal"
            >
              <span class="material-icons text-gray-500">close</span>
            </button>
          </div>

          <!-- Content -->
          <div ref="modalContentRef" class="p-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div
            class="flex justify-end border-t border-gray-200 px-6 py-4 space-x-2"
            v-if="$slots.footer"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
