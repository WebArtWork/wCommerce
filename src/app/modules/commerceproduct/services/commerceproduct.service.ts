import { Injectable } from '@angular/core';
import { Commerceproduct } from '../interfaces/commerceproduct.interface';
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
export class CommerceproductService extends CrudService<Commerceproduct> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commerceproduct',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
