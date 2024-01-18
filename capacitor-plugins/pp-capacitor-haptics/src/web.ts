import { WebPlugin } from '@capacitor/core';

import type { PPHapticsPlugin } from './definitions';

export class PPHapticsPluginWeb
	extends WebPlugin
	implements PPHapticsPlugin
{
	async echo(options: { value: string }): Promise<{ value: string }> {
		console.log('ECHO', options);
		return options;
	}
}
