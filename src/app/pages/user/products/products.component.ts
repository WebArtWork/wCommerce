import { Component } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'wacom';

@Component({
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	standalone: false
})
export class ProductsComponent {
	isMenuOpen = false;

	products: Product[] = [];

	page = 1;

	constructor(public userService: UserService, private _http: HttpService) {
		this._http
			.get('/api/commerce/products' + this._query())
			.subscribe((products: Product[]) =>
				this.products.push(
					...products.map((p) => {
						p.quantity = p.options
							?.map((o) => o.quantity || 0)
							.reduce((acc, num) => acc + num, 0);

						return p;
					})
				)
			);
	}

	back(): void {
		window.history.back();
	}

	private _query(): string {
		return (
			'?skip=0&limit=40' +
			(environment.commerceId
				? '&commerce=' + environment.commerceId
				: '')
		);
	}
}
