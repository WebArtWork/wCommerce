import { Injectable } from '@angular/core';
import { Commercecontent } from '../interfaces/commercecontent.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CommercecontentService extends CrudService<Commercecontent> {
	commercecontents: Commercecontent[] = this.getDocs();

	commercecontentsByAuthor: Record<string, Commercecontent[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commercecontent',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercecontentsByAuthor);
	}
}
