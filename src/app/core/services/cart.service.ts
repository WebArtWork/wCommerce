import { Injectable } from '@angular/core';
import { Commerceproduct } from 'src/app/modules/commerceproduct/interfaces/commerceproduct.interface';
import { StoreService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	products: Commerceproduct[] = [];

	constructor(private _storeService: StoreService) {}

	add(product: Commerceproduct) {
		if (!this.isAdded(product)) {
		}
	}

	toggle(product: Commerceproduct) {}

	isAdded(product: Commerceproduct): boolean {
		return !!this.products.find((p) => p._id === product._id);
	}
}
