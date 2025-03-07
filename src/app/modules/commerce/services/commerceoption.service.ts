import { Injectable } from '@angular/core';
import { CrudService, HttpService } from 'wacom';
import { Commerceoption } from '../interfaces/commerceoption.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class CommerceoptionService {
	constructor(
		private _http: HttpService
	){
	}

  getOptions(skip: number, perPage: number, store?: string, warehouse?: string): Observable<Commerceoption[]> {
    return this._http.get(`/api/commerce/options?skip=${skip}&limit=${perPage}&commerce=${environment.commerceId}&store=${store}&warehouse=${warehouse}`);
  }

	setOptionsQuantity(option: string, product: string, quantity: number, store?: string, warehouse?: string): Observable<Commerceoption[]> {
    return this._http.post(`/api/commerce/quantity`, {
			option,
			product,
			store,
			warehouse,
			quantity
		});
  }
}
