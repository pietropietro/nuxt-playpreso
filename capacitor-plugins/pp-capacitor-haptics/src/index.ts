import { registerPlugin } from '@capacitor/core';

import type { PPHapticsPlugin } from './definitions';

const PPHapticsPlugin = registerPlugin<PPHapticsPlugin>(
	'PPHapticsPlugin',
	{
		web: () => import('./web').then(m => new m.PPHapticsPluginWeb()),
	},
);

export * from './definitions';
export { PPHapticsPlugin };
