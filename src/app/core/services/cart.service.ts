import { Injectable } from '@angular/core';
import { Commerceproduct } from 'src/app/modules/commerce/interfaces/commerceproduct.interface';
import { StoreService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	products: Commerceproduct[];

	constructor(private _storeService: StoreService) {
		this._storeService.getJson(
			'cart_products',
			(products) => (this.products = products || this.products || [])
		);
	}

	add(product: Commerceproduct): void {
		this.isAdded(product).then((added) => {
			if (!added) {
				this.products.push(product);

				this._update();
			}
		});
	}

	remove(product: Commerceproduct): void {
		this.isAdded(product).then((added) => {
			if (added) {
				this.products.splice(
					this.products.findIndex((p) => p._id === product._id),
					1
				);

				this._update();
			}
		});
	}

	toggle(product: Commerceproduct): void {
		this.isAdded(product).then((added) => {
			if (added) {
				this.remove(product);
			} else {
				this.add(product);
			}
		});
	}

	async isAdded(product: Commerceproduct): Promise<boolean> {
		return new Promise((resolve) => {
			const done = (): void => {
				if (this.products) {
					resolve(!!this.products.find((p) => p._id === product._id));
				} else {
					setTimeout(done.bind(this), 100);
				}
			};

			done();
		});
	}

	private _update(): void {
		this._storeService.setJson('cart_products', this.products);
	}

	wait(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
