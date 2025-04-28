<template>
  <div
    class="timer-option"
    tabindex="0"
    :class="{ focused }"
    @click="$emit('select', time)"
  >
    {{ label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimerOption',
  props: {
    time: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    focused: {
      type: Boolean,
      default: false
    }
  }
});
</script> 