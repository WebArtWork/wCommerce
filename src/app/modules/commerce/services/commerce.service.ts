import { Injectable } from '@angular/core';
import { Commerce } from '../interfaces/commerce.interface';
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
export class CommerceService extends CrudService<Commerce> {
	commerces: Commerce[] = this.getDocs();

	commercesByAuthor: Record<string, Commerce[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commerce',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercesByAuthor);
	}
}
