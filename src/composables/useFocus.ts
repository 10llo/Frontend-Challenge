import type { Directive } from 'vue'

export function useFocus(): { vFocus: Directive } {
  const vFocus: Directive = {
    mounted: (el: HTMLElement) => el.focus(),
  }

  return { vFocus }
}
