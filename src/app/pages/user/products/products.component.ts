import { Component } from '@angular/core';
import { Commerceproduct } from 'src/app/modules/commerce/interfaces/commerceproduct.interface';
import { CommerceproductService } from 'src/app/modules/commerce/services/commerceproduct.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	standalone: false
})
export class ProductsComponent {
	isMenuOpen = false;

	products: Commerceproduct[] = [];

	page = 1;

	constructor(
		public userService: UserService,
		private _productService: CommerceproductService
	) {
		this._productService
			.get({
				query: environment.commerceId
					? 'commerce=' + environment.commerceId
					: '',
				page: 1,
				perPage: 40
			})
			.subscribe((products) => this.products.push(...products));
	}

	back(): void {
		window.history.back();
	}
}
