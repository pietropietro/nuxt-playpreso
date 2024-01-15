import { registerPlugin } from '@capacitor/core';

import type { SwipeBackNavigationHandlerPlugin } from './definitions';

const SwipeBackNavigationHandler =
	registerPlugin<SwipeBackNavigationHandlerPlugin>(
		'SwipeBackNavigationHandler',
		{
			web: () =>
				import('./web').then(m => new m.SwipeBackNavigationHandlerWeb()),
		},
	);

export * from './definitions';
export { SwipeBackNavigationHandler };
