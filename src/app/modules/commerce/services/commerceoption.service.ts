import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Commerceoption } from '../interfaces/commerceoption.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CommerceoptionService extends CrudService<Commerceoption> {
	constructor() {
		super({
			name: 'commerceoption'
		});
	}

  getOptions(skip: number, perPage: number, store: string, warehouse: string): Observable<Commerceoption[]> {
    return this.__http.get(`/api/commerceoption/options?skip=${skip}&limit=${perPage}&commerce=${environment.commerceId}&store=${store}&warehouse=${warehouse}`);
  }
}
