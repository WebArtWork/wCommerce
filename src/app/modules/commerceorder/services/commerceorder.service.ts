import { Injectable } from '@angular/core';
import { Commerceorder } from '../interfaces/commerceorder.interface';
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
export class CommerceorderService extends CrudService<Commerceorder> {
	commerceorders: Commerceorder[] = this.getDocs();

	commerceordersByAuthor: Record<string, Commerceorder[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commerceorder',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commerceordersByAuthor);
	}
}
