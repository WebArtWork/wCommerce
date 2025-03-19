// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as environmentProd } from './environment.prod';

export const environment = {
	...environmentProd,
	// commerceId: '674d9cbe7f4e98c4f2482a20',
	// appId: 'podhub',
	production: false,
	url: 'http://localhost:8080', // so we can locally connect with local database
	sign: {
		email: 'ceo@webart.work',
		password: 'asdasdasdasd',
		resetPin: null
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
