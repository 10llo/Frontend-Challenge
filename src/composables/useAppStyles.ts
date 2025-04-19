import { useCssModule } from 'vue'

export function useAppStyles() {
  const scrollbarClass = 'custom-scrollbar'

  const cx = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return {
    scrollbarClass,
    cx,
  }
}
