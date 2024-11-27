import { Injectable } from '@angular/core';
import { Commercestore } from '../interfaces/commercestore.interface';
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
export class CommercestoreService extends CrudService<Commercestore> {
	commercestores: Commercestore[] = this.getDocs();

	commercestoresByAuthor: Record<string, Commercestore[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commercestore',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercestoresByAuthor);
	}
}
