export interface MenuItem {
  name: string
  icon: string
  hasDropdown: boolean
}

// Re-export the RapidResponse type from its dedicated file
export type { RapidResponse } from './rapidResponse'
