import { WebPlugin } from '@capacitor/core';
import type { SwipeBackNavigationHandlerPlugin } from './definitions';

export class SwipeBackNavigationHandlerWeb
  extends WebPlugin
  implements SwipeBackNavigationHandlerPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  // Add the missing method so your web class satisfies the interface:
  async addSwipeGesture(): Promise<void> {
    // No-op for web, or any fallback logic you want
    console.log('addSwipeGesture() is not implemented on the web platform.');
  }
}
