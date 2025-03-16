import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Option, Product } from 'src/app/core/interfaces/product.interface';
import { CartService } from 'src/app/core/services/cart.service';
import {
	Commerceorder,
	Commerceorderproduct
} from 'src/app/modules/commerce/interfaces/commerceorder.interface';
import { CommerceorderService } from 'src/app/modules/commerce/services/commerceorder.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { CoreService, HttpService } from 'wacom';

@Component({
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	standalone: false
})
export class CartComponent {
	isMenuOpen = false;

	products: Product[] = this._cartService.products;

	orderingOptions: Record<string, Option[]> =
		this._cartService.orderingOptions;

	orderingQuantity: Record<string, number> =
		this._cartService.orderingQuantity;

	constructor(
		private _orderService: CommerceorderService,
		private _cartService: CartService,
		public userService: UserService,
		private _core: CoreService,
		private _http: HttpService,
		private _router: Router
	) {
		for (const product of this.products) {
			if (!this.orderingOptions[product._id]?.length) {
				this.orderingOptions[product._id] =
					this.orderingOptions[product._id] || [];

				if (product.options?.length) {
					this.orderingOptions[product._id].push(product.options[0]);

					this.orderingQuantity[product.options[0]._id] = 1;

					this.update();
				}
			}
		}

		this.load();
	}

	update(): void {
		this._cartService.update();
	}

	remove(product: Product): void {
		this.products = this.products.filter((p) => p._id !== product._id);

		this._cartService.remove(product);
	}

	async load(): Promise<void> {
		const obs = this._http.get('/api/commerce/products' + this._query());

		obs.subscribe((products: Product[]) => {
			this.products = products.map((p) => {
				p.quantity = p.options
					?.map((o) => o.quantity || 0)
					.reduce((acc, num) => acc + num, 0);

				return p;
			});

			this._cartService.products = this.products;
		});

		await obs.toPromise();
	}

	back(): void {
		window.history.back();
	}

	async order(): Promise<void> {
		await this.load();

		this._orderService
			.create({
				deviceID: this._core.deviceID,
				products: this._orderProducts()
			} as Commerceorder)
			.subscribe(() => {
				this._cartService.clear();

				this._router.navigateByUrl('/orders');
			});
	}

	private _query(): string {
		return (
			'?_ids=' +
			this._cartService.products.map((p) => p._id).toString() +
			(environment.commerceId
				? '&commerce=' + environment.commerceId
				: '')
		);
	}

	private _orderProducts(): Commerceorderproduct[] {
		const products: Commerceorderproduct[] = [];

		for (const product of this.products) {
			for (const option of this.orderingOptions[product._id]) {
				products.push({
					quantity: this.orderingQuantity[option._id] || 1,
					product: product._id,
					option: option._id
				});
			}
		}

		return products;
	}
}
