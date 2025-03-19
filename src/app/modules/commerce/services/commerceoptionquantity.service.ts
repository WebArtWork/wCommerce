import { Injectable } from '@angular/core';
import { CrudService, HttpService } from 'wacom';
import { Commerceoptionquantity } from '../interfaces/commerceoptionquantity.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class CommerceoptionquantityService {
	constructor(
		private _http: HttpService
	){
	}

  getOptions(skip: number, perPage: number, store?: string, warehouse?: string): Observable<Commerceoptionquantity[]> {
    return this._http.get(`/api/commerce/options?skip=${skip}&limit=${perPage}&commerce=${environment.commerceId}&store=${store}&warehouse=${warehouse}`);
  }

	setOptionsQuantity(option: string, product: string, quantity: number, store?: string, warehouse?: string): Observable<Commerceoptionquantity[]> {
    return this._http.post(`/api/commerce/quantity`, {
			option,
			product,
			store,
			warehouse,
			quantity
		});
  }
}
