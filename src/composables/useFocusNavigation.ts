import { ref, onMounted, onUnmounted } from 'vue';
import type { FocusNavigationOptions, FocusNavigationReturn } from './types';

export function useFocusNavigation(options: FocusNavigationOptions = {}): FocusNavigationReturn {
  const currentFocusIndex = ref(0);
  const focusableElements = ref<HTMLElement[]>([]);
  const { onExit, onBack, itemsPerRow = 3 } = options;

  const updateFocusableElements = () => {
    // Get all focusable elements
    focusableElements.value = Array.from(
      document.querySelectorAll('button, [tabindex="0"]')
    ).filter((el): el is HTMLElement => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });

    // Set initial focus if no element is focused
    if (!document.activeElement || document.activeElement === document.body) {
      if (focusableElements.value.length > 0) {
        currentFocusIndex.value = 0;
        focusableElements.value[0].focus();
        focusableElements.value[0].classList.add('focused');
      }
    } else {
      // Update currentFocusIndex based on active element
      currentFocusIndex.value = focusableElements.value.indexOf(document.activeElement as HTMLElement);
      if (currentFocusIndex.value === -1) currentFocusIndex.value = 0;
    }
  };

  const moveFocus = (direction: 'left' | 'right' | 'up' | 'down') => {
    // Remove focus from current element
    if (focusableElements.value[currentFocusIndex.value]) {
      focusableElements.value[currentFocusIndex.value].classList.remove('focused');
    }

    const currentRow = Math.floor(currentFocusIndex.value / itemsPerRow);
    const currentCol = currentFocusIndex.value % itemsPerRow;
    const totalRows = Math.ceil(focusableElements.value.length / itemsPerRow);

    switch(direction) {
      case 'left':
        if (currentCol > 0) {
          currentFocusIndex.value--;
        }
        break;
      case 'right':
        if (currentCol < itemsPerRow - 1 && currentFocusIndex.value < focusableElements.value.length - 1) {
          currentFocusIndex.value++;
        }
        break;
      case 'up':
        if (currentRow > 0) {
          currentFocusIndex.value -= itemsPerRow;
        }
        break;
      case 'down':
        if (currentRow < totalRows - 1 && currentFocusIndex.value + itemsPerRow < focusableElements.value.length) {
          currentFocusIndex.value += itemsPerRow;
        }
        break;
    }

    // Set focus to new element
    if (focusableElements.value[currentFocusIndex.value]) {
      focusableElements.value[currentFocusIndex.value].focus();
      focusableElements.value[currentFocusIndex.value].classList.add('focused');
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    switch(e.keyCode) {
      case 37: // LEFT arrow
        e.preventDefault();
        moveFocus('left');
        break;
      case 38: // UP arrow
        e.preventDefault();
        moveFocus('up');
        break;
      case 39: // RIGHT arrow
        e.preventDefault();
        moveFocus('right');
        break;
      case 40: // DOWN arrow
        e.preventDefault();
        moveFocus('down');
        break;
      case 13: // ENTER/OK button
        e.preventDefault();
        if (document.activeElement) {
          (document.activeElement as HTMLElement).click();
        }
        break;
      case 10009: // RETURN button (Tizen TV)
        if (onBack) {
          onBack();
        } else if (onExit && window.tizen) {
          onExit();
        }
        break;
    }
  };

  onMounted(() => {
    updateFocusableElements();
    window.addEventListener('keydown', handleKeydown);
    
    // Update focus when visibility changes (e.g., when returning to app)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && focusableElements.value.length > 0) {
        focusableElements.value[currentFocusIndex.value].focus();
        focusableElements.value[currentFocusIndex.value].classList.add('focused');
      }
    });
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  return {
    updateFocusableElements,
    moveFocus,
    currentFocusIndex: currentFocusIndex.value,
    focusableElements: focusableElements.value
  };
} 