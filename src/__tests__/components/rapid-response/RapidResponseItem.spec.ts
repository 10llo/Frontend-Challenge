import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import RapidResponseItem from '../../../components/rapid-response/RapidResponseItem.vue'
import { useUIStore } from '../../../stores/ui'

const mockItem = {
  id: '1',
  name: 'Test Response',
  status: 'Active',
  properties: '10',
  lastPropertyEntry: '2023-10-15',
  price: '$100',
  lastDeploy: '2023-10-10',
}

describe('RapidResponseItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly with active item', () => {
    const wrapper = mount(RapidResponseItem, {
      props: {
        item: mockItem,
      },
      global: {
        stubs: {
          'span.material-icons-outlined': {
            template: '<div class="material-icons-stub"><slot /></div>',
          },
        },
      },
    })

    // Verify component renders correctly
    expect(wrapper.text()).toContain('Test Response')
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('2023-10-15')
    expect(wrapper.text()).toContain('$100')
    expect(wrapper.text()).toContain('Last deploy 2023-10-10')

    // Verify edit and delete buttons are present for active items
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('renders properly with inactive item', () => {
    const inactiveItem = { ...mockItem, status: 'Inactive' }
    const wrapper = mount(RapidResponseItem, {
      props: {
        item: inactiveItem,
      },
    })

    // Verify inactive styling is applied
    expect(wrapper.classes()).toContain('opacity-70')

    // Verify action buttons are not present for inactive items
    const actionDiv = wrapper.find('div.flex-1.flex')
    expect(actionDiv.exists()).toBe(false)
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(RapidResponseItem, {
      props: {
        item: mockItem,
      },
    })

    // Find delete button and click it
    const deleteButton = wrapper.findAll('button')[0]
    await deleteButton.trigger('click')

    // Verify delete event is emitted with correct item id
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')![0]).toEqual(['1'])
  })

  it('enters edit mode when edit button is clicked', async () => {
    const wrapper = mount(RapidResponseItem, {
      props: {
        item: mockItem,
      },
    })

    // Get UI store
    const uiStore = useUIStore()

    // Mock startEditing method to verify it's called correctly
    const startEditingSpy = vi.spyOn(uiStore, 'startEditing')

    // Find edit button (second button) and click it
    const editButton = wrapper.findAll('button')[1]
    await editButton.trigger('click')

    // Verify startEditing was called with correct parameters
    expect(startEditingSpy).toHaveBeenCalledWith('1', 'Test Response')
  })

  it('shows input field when in edit mode', async () => {
    const wrapper = mount(RapidResponseItem, {
      props: {
        item: mockItem,
      },
    })

    // Get UI store and set edit mode
    const uiStore = useUIStore()
    uiStore.startEditing('1', 'Test Response')

    // Wait for component to update
    await wrapper.vm.$nextTick()

    // Verify input field is shown
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('Test Response')

    // Verify save button is shown instead of edit/delete buttons
    const saveButton = wrapper.find('button')
    expect(saveButton.text()).toContain('Save name')
  })

  it('emits update:name event when save button is clicked', async () => {
    const wrapper = mount(RapidResponseItem, {
      props: {
        item: mockItem,
      },
    })

    // Get UI store and set edit mode
    const uiStore = useUIStore()
    uiStore.startEditing('1', 'Test Response')

    // Update the input value
    uiStore.editedValue = 'Updated Name'

    // Wait for component to update
    await wrapper.vm.$nextTick()

    // Find save button and click it
    const saveButton = wrapper.find('button')
    await saveButton.trigger('click')

    // Verify update:name event is emitted with correct parameters
    expect(wrapper.emitted('update:name')).toBeTruthy()
    expect(wrapper.emitted('update:name')![0]).toEqual(['1', 'Updated Name'])
  })
})
