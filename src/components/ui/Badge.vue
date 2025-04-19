<script setup lang="ts">
defineOptions({
  name: 'UiBadge',
})

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default'

interface Props {
  variant?: BadgeVariant
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  warning: 'bg-yellow-50 text-yellow-800',
  info: 'bg-blue-50 text-blue-800',
  default: 'bg-gray-50 text-gray-600',
}
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-md px-2 py-1 text-sm font-semibold"
    :class="variantClasses[props.variant]"
  >
    {{ props.label }}
  </span>
</template>
