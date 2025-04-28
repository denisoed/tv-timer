export interface FocusNavigationOptions {
  onExit?: () => void;
  onBack?: () => void;
  itemsPerRow?: number;
}

export interface FocusNavigationReturn {
  updateFocusableElements: () => void;
  moveFocus: (direction: 'left' | 'right' | 'up' | 'down') => void;
  currentFocusIndex: number;
  focusableElements: HTMLElement[];
} 