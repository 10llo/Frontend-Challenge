import { mount, VueWrapper } from '@vue/test-utils'
import { Component } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

export function mountWithPinia<T extends Component>(
  component: T,
  options: Record<string, unknown> = {},
) {
  // Initialize a fresh Pinia instance
  const pinia = createPinia()
  setActivePinia(pinia)

  // Mount the component with Pinia configured
  return mount(component, {
    global: {
      plugins: [pinia],
      ...(options.global || {}),
    },
    ...options,
  })
}

export async function waitForUpdate() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export function findAll(wrapper: VueWrapper<Component>, selector: string) {
  return wrapper.findAll(selector)
}

export function mockConsoleError() {
  const originalError = console.error
  const mockFn = vi.fn()
  console.error = mockFn

  return {
    mockFn,
    restore: () => {
      console.error = originalError
    },
  }
}
