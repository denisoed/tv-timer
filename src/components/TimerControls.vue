<template>
  <div class="buttons">
    <button
      class="button play-pause"
      tabindex="0"
      :class="{ focused: focusedButton === 'play' }"
      @click="$emit('toggle-play')"
    >
      <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play">
        <path d="M5 3l14 9-14 9z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>
    </button>
    <button
      class="button reset-btn"
      tabindex="0"
      :class="{ focused: focusedButton === 'reset' }"
      @click="$emit('reset')"
    >
      <svg width="24" height="24" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="matrix(0 1 1 0 2.5 2.5)">
          <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/>
          <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"/>
        </g>
      </svg>
    </button>
    <button
      class="button"
      tabindex="0"
      :class="{ focused: focusedButton === 'back' }"
      @click="$emit('back')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimerControls',
  props: {
    isPlaying: {
      type: Boolean,
      required: true
    },
    focusedButton: {
      type: String as () => 'play' | 'reset' | 'back' | null,
      default: null
    }
  }
});
</script> 