import { defineStore } from 'pinia';

interface TimerState {
  selectedTime: number;
  remainingTime: number;
  isRunning: boolean;
  cycleCount: number;
  intervalId: number | null;
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerState => ({
    selectedTime: 0,
    remainingTime: 0,
    isRunning: false,
    cycleCount: 0,
    intervalId: null,
  }),

  getters: {
    formattedTime: (state) => {
      const mins = Math.floor(state.remainingTime / 60).toString().padStart(2, '0');
      const secs = (state.remainingTime % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    },
    progress: (state) => {
      return (state.selectedTime - state.remainingTime) / state.selectedTime;
    },
  },

  actions: {
    startTimer() {
      if (!this.isRunning) {
        if (this.remainingTime <= 0) {
          this.remainingTime = this.selectedTime;
        }
        this.isRunning = true;
        this.intervalId = window.setInterval(() => {
          if (this.remainingTime <= 0) {
            this.stopTimer();
            this.cycleCount++;
            return;
          }
          this.remainingTime--;
        }, 1000);
      }
    },

    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.isRunning = false;
      this.intervalId = null;
    },

    resetTimer() {
      this.stopTimer();
      this.remainingTime = this.selectedTime;
    },

    setTimer(time: number) {
      this.selectedTime = time;
      this.remainingTime = time;
      this.cycleCount = 0;
    },
  },
}); 