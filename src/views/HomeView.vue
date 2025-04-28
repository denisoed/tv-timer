<template>
  <div class="container">
    <div id="timerList" class="timer-list" v-if="!showTimer">
      <div class="timer-row">
        <TimerOption
          v-for="(option, index) in timerOptions.slice(0, 3)"
          :key="option.time"
          :time="option.time"
          :label="option.label"
          :focused="isElementFocused(index)"
          @select="selectTimer"
        />
      </div>
      <div class="timer-row">
        <TimerOption
          v-for="(option, index) in timerOptions.slice(3)"
          :key="option.time"
          :time="option.time"
          :label="option.label"
          :focused="isElementFocused(index + 3)"
          @select="selectTimer"
        />
      </div>
    </div>

    <div id="timerScreen" class="timer-screen" :class="{ show: showTimer }" v-else>
      <div class="timer-label">{{ selectedLabel }}</div>
      <div class="cycle-counter">Cycles: {{ store.cycleCount }}</div>
      
      <TimerDisplay
        :time="store.formattedTime"
        :progress="store.progress"
      />

      <TimerControls
        :is-playing="store.isRunning"
        :focused-button="getFocusedButton()"
        @toggle-play="toggleTimer"
        @reset="store.resetTimer"
        @back="showTimerList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useTimerStore } from '@/stores/timerStore';
import { useFocusNavigation } from '@/composables/useFocusNavigation';
import TimerOption from '@/components/TimerOption.vue';
import TimerDisplay from '@/components/TimerDisplay.vue';
import TimerControls from '@/components/TimerControls.vue';

interface TimerOption {
  time: number;
  label: string;
}

export default defineComponent({
  name: 'HomeView',
  components: {
    TimerOption,
    TimerDisplay,
    TimerControls,
  },
  setup() {
    const store = useTimerStore();
    const showTimer = ref(false);
    const selectedLabel = ref('');

    const timerOptions: TimerOption[] = [
      { time: 30, label: '30 sec' },
      { time: 60, label: '1 min' },
      { time: 300, label: '5 min' },
      { time: 600, label: '10 min' },
      { time: 900, label: '15 min' },
      { time: 1800, label: '30 min' },
    ];

    const selectTimer = (time: number) => {
      const option = timerOptions.find(opt => opt.time === time);
      if (option) {
        selectedLabel.value = option.label;
        store.setTimer(time);
        showTimer.value = true;
      }
    };

    const toggleTimer = () => {
      if (store.isRunning) {
        store.stopTimer();
      } else {
        store.startTimer();
      }
    };

    const showTimerList = () => {
      store.stopTimer();
      store.resetTimer();
      showTimer.value = false;
    };

    const exitApp = () => {
      if (window.tizen) {
        window.tizen.application.getCurrentApplication().exit();
      }
    };

    const { updateFocusableElements, currentFocusIndex } = useFocusNavigation({
      onExit: exitApp,
      onBack: showTimerList,
      itemsPerRow: 3
    });

    // Helper functions for focus management
    const isElementFocused = (index: number) => {
      return currentFocusIndex === index;
    };

    const getFocusedButton = () => {
      if (!showTimer.value) return null;
      
      const buttonMap = ['play', 'reset', 'back'];
      const buttonIndex = currentFocusIndex - 6; // Subtract timer options count
      return buttonMap[buttonIndex] || null;
    };

    // Update focusable elements when timer view changes
    watch(showTimer, () => {
      setTimeout(updateFocusableElements, 100);
    });

    return {
      store,
      showTimer,
      selectedLabel,
      timerOptions,
      selectTimer,
      toggleTimer,
      showTimerList,
      isElementFocused,
      getFocusedButton,
    };
  },
});
</script>
