<template>
  <div class="timer-display">
    <svg class="timer-circle">
      <circle class="timer-circle-bg" cx="100" cy="100" r="95"></circle>
      <circle
        class="timer-circle-progress"
        cx="100" cy="100" r="95"
        :style="{ strokeDasharray: circumference, strokeDashoffset: dashOffset }"
      ></circle>
    </svg>
    <span>{{ time }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'TimerDisplay',
  props: {
    time: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const circumference = 2 * Math.PI * 95;
    const dashOffset = computed(() => circumference * (1 - props.progress));

    return {
      circumference,
      dashOffset
    };
  }
});
</script> 