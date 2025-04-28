declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
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

  export interface TimerGetters {
    formattedTime: string
    progress: number
  }

  export interface TimerActions {
    startTimer: () => void
    stopTimer: () => void
    resetTimer: () => void
    setTimer: (time: number) => void
  }

  export type TimerStore = Store<'timer', TimerState> & TimerActions & TimerGetters
  export const useTimerStore: () => TimerStore
}

declare module '@/composables/useFocusNavigation' {
  import type { FocusNavigationOptions, FocusNavigationReturn } from './types'
  export function useFocusNavigation(options?: FocusNavigationOptions): FocusNavigationReturn
}

declare module '@/components/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
} 