export interface SwipeBackNavigationHandlerPlugin {
	echo(options: { value: string }): Promise<{ value: string }>;
	addSwipeGesture(): Promise<void>;
  }