import { Injectable } from '@angular/core';
import { Commerceorder } from '../interfaces/commerceorder.interface';
import { CoreService, CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceorderService extends CrudService<Commerceorder> {
	commerceorders: Commerceorder[] = this.getDocs();

	commerceordersByAuthor: Record<string, Commerceorder[]> = {};

	constructor(private _core: CoreService) {
		super({
			name: 'commerceorder'
		});

		this.get({
			query: 'deviceID=' + this._core.deviceID
		});

		this.filteredDocuments(this.commerceordersByAuthor);
	}
}
