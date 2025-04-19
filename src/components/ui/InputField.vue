<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({
  name: 'InputField',
})

interface Props {
  modelValue: string
  placeholder?: string
  label?: string
  type?: 'text' | 'password' | 'email' | 'number'
  icon?: string
  disabled?: boolean
  error?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  label: '',
  type: 'text',
  icon: '',
  disabled: false,
  error: '',
  ariaLabel: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focus'): void
}>()

const hasError = computed(() => !!props.error)
const hasLabel = computed(() => !!props.label)
const hasIcon = computed(() => !!props.icon)

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

// Add reference to actual input element
const inputElement = ref<HTMLInputElement | null>(null)

// Expose the focus method
defineExpose({
  focus: () => inputElement.value?.focus(),
})
</script>

<template>
  <div class="w-full">
    <label v-if="hasLabel" class="block text-sm font-medium text-gray-600 mb-1">
      {{ label }}
    </label>

    <div
      class="relative w-full h-9 border rounded flex items-center px-3 gap-2"
      :class="[
        hasError ? 'border-red-800' : disabled ? 'border-gray-300 bg-gray-50' : 'border-gray-400',
      ]"
    >
      <span v-if="hasIcon" class="material-icons text-gray-500 text-sm">
        {{ icon }}
      </span>

      <input
        ref="inputElement"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="outline-none text-sm flex-1 bg-transparent"
        :class="[disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600']"
        @input="updateValue"
        @blur="emit('blur')"
        @focus="emit('focus')"
        :aria-label="ariaLabel"
      />
    </div>

    <p v-if="hasError" class="mt-1 text-xs text-red-800">
      {{ error }}
    </p>
  </div>
</template>
