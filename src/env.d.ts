/// <reference types="vite/client" />

interface Window {
  tizen?: {
    application: {
      getCurrentApplication(): {
        exit(): void;
      };
    };
  };
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
} 