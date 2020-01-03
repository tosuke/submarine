/// <reference types="react-native" />
import 'react-native'

declare module 'react-native' {
  namespace Animated {
    interface AnimatedWithChildren {
      /**
       * Adds an asynchronous listener to the value so you can observe updates from
       * animations.  This is useful because there is no way to
       * synchronously read the value because it might be driven natively.
       */
      addListener(callback: ValueListenerCallback): string

      removeListener(id: string): void

      removeAllListeners(): void
    }
  }
}
