import { Injectable } from '@angular/core';
import { Commercewarehouse } from '../interfaces/commercewarehouse.interface';
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
export class CommercewarehouseService extends CrudService<Commercewarehouse> {
	commercewarehouses: Commercewarehouse[] = this.getDocs();

	commercewarehousesByAuthor: Record<string, Commercewarehouse[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commercewarehouse',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercewarehousesByAuthor);
	}
}
