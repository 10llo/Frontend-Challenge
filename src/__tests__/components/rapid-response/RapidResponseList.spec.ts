import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import RapidResponseList from '../../../components/rapid-response/RapidResponseList.vue'

const updateResponseNameMock = vi.fn()
const markAsEliminatedMock = vi.fn()

vi.mock('../../../stores/rapidResponse', () => ({
  useRapidResponseStore: vi.fn(() => ({
    filteredResponses: vi.fn((query) => {
      if (query === 'test2') {
        return [mockResponses[1]]
      }
      return mockResponses
    }),
    updateResponseName: updateResponseNameMock,
    markAsEliminated: markAsEliminatedMock,
  })),
}))

// Mock responses
const mockResponses = [
  {
    id: '1',
    name: 'Test Response 1',
    status: 'Active',
    properties: '5',
    lastPropertyEntry: '2023-10-15',
    price: '$100',
    lastDeploy: '2023-10-10',
  },
  {
    id: '2',
    name: 'Test Response 2',
    status: 'Inactive',
    properties: '3',
    lastPropertyEntry: '2023-09-20',
    price: '$75',
    lastDeploy: '2023-09-15',
  },
]

// Mock RapidResponseItem component
vi.mock('../../../components/rapid-response/RapidResponseItem.vue', () => ({
  default: {
    name: 'RapidResponseItem',
    props: ['item'],
    template: '<div class="mock-rapid-response-item" data-testid="item">{{ item.name }}</div>',
    emits: ['update:name', 'delete'],
  },
}))

// Mock Button component
vi.mock('../../../components/ui/Button.vue', () => ({
  default: {
    name: 'AppButton',
    props: ['variant', 'icon'],
    template: '<button><slot /></button>',
  },
}))

// Mock InputField component
vi.mock('../../../components/ui/InputField.vue', () => ({
  default: {
    name: 'InputField',
    props: ['modelValue', 'placeholder', 'icon'],
    template:
      '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
  },
}))

// Mock SignatureRequiredModal component
vi.mock('../../../components/ui/SignatureRequiredModal.vue', () => ({
  default: {
    name: 'SignatureRequiredModal',
    props: ['modelValue'],
    template: '<div v-if="modelValue" class="mock-modal">Modal Content</div>',
  },
}))

describe('RapidResponseList', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('renders properly', () => {
    const wrapper = mount(RapidResponseList)

    // Check title is rendered
    expect(wrapper.find('h1').text()).toBe('Rapid Response')

    // Check buttons are rendered
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].text()).toContain('Signatures and templates')
    expect(buttons[1].text()).toContain('New Rapid Response')

    // Check table headers are rendered
    const tableHeaders = wrapper.find('.flex.items-center.px-5.py-2')
    expect(tableHeaders.text()).toContain('Name')
    expect(tableHeaders.text()).toContain('Status')
    expect(tableHeaders.text()).toContain('Properties')
    expect(tableHeaders.text()).toContain('Last property entry')
    expect(tableHeaders.text()).toContain('Price')

    // Check items are rendered
    const items = wrapper.findAll('.mock-rapid-response-item')
    expect(items.length).toBe(2)
    expect(items[0].text()).toBe('Test Response 1')
    expect(items[1].text()).toBe('Test Response 2')
  })

  it('filters responses based on search query', async () => {
    const wrapper = mount(RapidResponseList)

    // Find search input and update value
    const searchInput = wrapper.find('input')
    await searchInput.setValue('test2')

    // Check that the filtered list contains only the matching item
    const items = wrapper.findAll('.mock-rapid-response-item')
    expect(items.length).toBe(1)
    expect(items[0].text()).toBe('Test Response 2')
  })

  it('updates response name when name update event is emitted', async () => {
    const wrapper = mount(RapidResponseList, {
      global: {
        stubs: {
          RapidResponseItem: false,
        },
      },
    })

    // Find first item component and emit update:name event
    const items = wrapper.findAllComponents({ name: 'RapidResponseItem' })
    await items[0].vm.$emit('update:name', '1', 'Updated Name')

    // Verify store method was called with correct parameters
    expect(updateResponseNameMock).toHaveBeenCalledWith('1', 'Updated Name')
  })

  it('marks response as eliminated when delete event is emitted', async () => {
    const wrapper = mount(RapidResponseList, {
      global: {
        stubs: {
          RapidResponseItem: false,
        },
      },
    })

    // Find first item component and emit delete event
    const items = wrapper.findAllComponents({ name: 'RapidResponseItem' })
    await items[0].vm.$emit('delete', '1')

    // Verify store method was called with correct parameters
    expect(markAsEliminatedMock).toHaveBeenCalledWith('1')
  })

  it('opens modal when New Rapid Response button is clicked', async () => {
    const wrapper = mount(RapidResponseList)

    // Verify modal is initially hidden
    expect(wrapper.find('.mock-modal').exists()).toBe(false)

    // Click New Rapid Response button
    const newButton = wrapper.findAll('button')[1]
    await newButton.trigger('click')

    // Verify modal is now visible
    expect(wrapper.find('.mock-modal').exists()).toBe(true)
  })
})
