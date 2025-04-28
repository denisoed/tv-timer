declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/stores/timerStore' {
  import { Store } from 'pinia'
  export interface TimerState {
    selectedTime: number
    remainingTime: number
    isRunning: boolean
    cycleCount: number
    intervalId: number | null
  }
  export const useTimerStore: () => Store<'timer', TimerState>
}

declare module '@/composables/useFocusNavigation' {
  import type { FocusNavigationOptions, FocusNavigationReturn } from './types'
  export function useFocusNavigation(options?: FocusNavigationOptions): FocusNavigationReturn
}

declare module '@/components/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
} 