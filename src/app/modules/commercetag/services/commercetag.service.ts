import { Injectable } from '@angular/core';
import { Commercetag } from '../interfaces/commercetag.interface';
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
export class CommercetagService extends CrudService<Commercetag> {
	commercetags: Commercetag[] = this.getDocs();

	commercetagsByAuthor: Record<string, Commercetag[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commercetag',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commercetagsByAuthor);
	}
}
