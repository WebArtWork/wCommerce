import { Injectable } from '@angular/core';
import { CoreService, StoreService } from 'wacom';
import { Option, Product } from '../interfaces/product.interface';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	products: Product[];

	orderingOptions: Record<string, Option[]> = {};

	orderingQuantity: Record<string, number> = {};

	constructor(
		private _storeService: StoreService,
		private _core: CoreService
	) {
		this._storeService.getJson(
			'cart_products',
			(products: Product[]) =>
				(this.products = products || this.products || [])
		);

		this._storeService.getJson(
			'cart_options',
			(orderingOptions: Record<string, Option[]>) =>
				this._core.copy(orderingOptions || {}, this.orderingOptions)
		);

		this._storeService.getJson(
			'cart_quantity',
			(orderingQuantity: Record<string, number>) =>
				this._core.copy(orderingQuantity || {}, this.orderingQuantity)
		);
	}

	clear(): void {
		this.products = [];

		this.orderingOptions = {};

		this.orderingQuantity = {};

		this._storeService.remove('cart_products');

		this._storeService.remove('cart_options');

		this._storeService.remove('cart_quantity');
	}

	update(): void {
		this._storeService.setJson('cart_options', this.orderingOptions);

		this._storeService.setJson('cart_quantity', this.orderingQuantity);
	}

	add(product: Product): void {
		this.isAdded(product).then((added) => {
			if (!added) {
				this.products.push(product);

				this._update();
			}
		});
	}

	remove(product: Product): void {
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

	toggle(product: Product): void {
		this.isAdded(product).then((added) => {
			if (added) {
				this.remove(product);
			} else {
				this.add(product);
			}
		});
	}

	async isAdded(product: Product): Promise<boolean> {
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
