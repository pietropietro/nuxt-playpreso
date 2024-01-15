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
}
