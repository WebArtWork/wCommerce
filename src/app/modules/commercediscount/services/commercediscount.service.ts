import { Injectable } from '@angular/core';
import { Commercediscount } from '../interfaces/commercediscount.interface';
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
export class CommercediscountService extends CrudService<Commercediscount> {
	commercediscounts: Commercediscount[] = this.getDocs();

	commercediscountsByAuthor: Record<string, Commercediscount[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commercediscount',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercediscountsByAuthor);
	}
}
