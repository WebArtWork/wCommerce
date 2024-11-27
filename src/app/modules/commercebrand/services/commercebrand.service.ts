import { Injectable } from '@angular/core';
import { Commercebrand } from '../interfaces/commercebrand.interface';
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
export class CommercebrandService extends CrudService<Commercebrand> {
	commercebrands: Commercebrand[] = this.getDocs();

	commercebrandsByAuthor: Record<string, Commercebrand[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commercebrand',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercebrandsByAuthor);
	}
}
