import { Injectable } from '@angular/core';
import { Commerceproductquantity } from '../interfaces/commerceproductquantity.interface';
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
export class CommerceproductquantityService extends CrudService<Commerceproductquantity> {
	commerceproductquantitys: Commerceproductquantity[] = this.getDocs();

	commerceproductquantitysByStore: Record<string, Commerceproductquantity[]> = {};
	commerceproductquantitysByWarehouse: Record<string, Commerceproductquantity[]> = {};
	commerceproductquantitysByProduct: Record<string, Commerceproductquantity[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commerceproductquantity',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commerceproductquantitysByStore, 'store');
		this.filteredDocuments(this.commerceproductquantitysByWarehouse, 'warehouse');
		this.filteredDocuments(this.commerceproductquantitysByProduct, 'product');
	}
}
