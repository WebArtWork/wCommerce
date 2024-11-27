import { Injectable } from '@angular/core';
import { Commerceportfolio } from '../interfaces/commerceportfolio.interface';
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
export class CommerceportfolioService extends CrudService<Commerceportfolio> {
	commerceportfolios: Commerceportfolio[] = this.getDocs();

	commerceportfoliosByAuthor: Record<string, Commerceportfolio[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'commerceportfolio',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.commerceportfoliosByAuthor);
	}
}
