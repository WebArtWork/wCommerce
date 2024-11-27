import { Injectable } from '@angular/core';
import { Commerceservice } from '../interfaces/commerceservice.interface';
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
export class CommerceserviceService extends CrudService<Commerceservice> {
	commerceservices: Commerceservice[] = this.getDocs();

	commerceservicesByAuthor: Record<string, Commerceservice[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commerceservice',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commerceservicesByAuthor);
	}
}
