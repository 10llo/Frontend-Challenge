<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'AppButton',
})

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  loading?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  icon: '',
  disabled: false,
  type: 'button',
  fullWidth: false,
  loading: false,
  ariaLabel: '',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-900 text-white hover:bg-opacity-90 focus:ring-2 focus:ring-blue-800 focus:ring-offset-2'
    case 'secondary':
      return 'bg-white text-gray-700 border border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
    case 'danger':
      return 'bg-red-800 text-white hover:bg-opacity-90 focus:ring-2 focus:ring-red-800 focus:ring-offset-2'
    default:
      return 'bg-blue-900 text-white hover:bg-opacity-90 focus:ring-2 focus:ring-blue-800 focus:ring-offset-2'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-2 py-1'
    case 'md':
      return 'text-base px-4 py-2'
    case 'lg':
      return 'text-lg px-6 py-3'
    default:
      return 'text-base px-4 py-2'
  }
})

const buttonClasses = computed(() => [
  'rounded-md flex justify-center items-center gap-2 transition-all duration-200 focus:outline-none',
  variantClasses.value,
  sizeClasses.value,
  props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  props.fullWidth ? 'w-full' : '',
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    @click="handleClick"
    :disabled="disabled || loading"
    :type="type"
    :aria-label="ariaLabel || undefined"
    :aria-busy="loading"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="material-icons-outlined animate-spin text-lg">sync</span>

    <!-- Icon -->
    <span v-else-if="icon" class="material-icons-outlined text-lg">{{ icon }}</span>

    <!-- Content -->
    <slot></slot>
  </button>
</template>
