import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'wacom';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	standalone: false
})
export class ProductComponent {
	readonly url = environment.url;

	_id = this._router.url.replace('/product/', '');

	product: Product;

	inCart = false;

	isMenuOpen = false;

	constructor(
		public cartService: CartService,
		public userService: UserService,
		private _http: HttpService,
		private _router: Router
	) {
		this._http
			.get('/api/commerce/product' + this._query())
			.subscribe((product: Product) => {
				product.quantity = product.options
					?.map((o) => o.quantity || 0)
					.reduce((acc, num) => acc + num, 0);

				this.product = product;

				this.cartService
					.isAdded(this.product)
					.then((inCart) => (this.inCart = inCart));
			});
	}

	back(): void {
		window.history.back();
	}

	private _query(): string {
		return (
			'?_id=' +
			this._id +
			(environment.commerceId
				? '&commerce=' + environment.commerceId
				: '')
		);
	}
}
