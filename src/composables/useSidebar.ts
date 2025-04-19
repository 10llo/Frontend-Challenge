import { ref } from 'vue'

export interface MenuItem {
  name: string
  icon: string
  hasDropdown: boolean
}

export function useSidebar() {
  const isCollapsed = ref(false)

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'analytics', hasDropdown: false },
    { name: 'Buybox', icon: 'dashboard_customize', hasDropdown: true },
    { name: 'Properties', icon: 'house', hasDropdown: true },
    { name: 'Buyers', icon: 'monetization_on', hasDropdown: false },
    { name: 'Skip trace', icon: 'call', hasDropdown: false },
    { name: 'Fulfillment', icon: 'article', hasDropdown: true },
    { name: 'Integrations', icon: 'call_merge', hasDropdown: true },
    { name: 'Tools', icon: 'build', hasDropdown: true },
    { name: 'Payment', icon: 'credit_card', hasDropdown: true },
  ]

  const bottomItems: MenuItem[] = [{ name: 'Settings', icon: 'settings', hasDropdown: true }]

  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    menuItems,
    bottomItems,
    toggleSidebar,
  }
}
