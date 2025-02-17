import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Commerceproduct } from 'src/app/modules/commerce/interfaces/commerceproduct.interface';
import { CommerceproductService } from 'src/app/modules/commerce/services/commerceproduct.service';
import { Commerceproductquantity } from 'src/app/modules/commerce/interfaces/commerceproductquantity.interface';
import { CommerceproductquantityService } from 'src/app/modules/commerce/services/commerceproductquantity.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	standalone: false
})
export class ProductComponent implements OnInit {
	readonly url = environment.url;

	_id = this._router.url.replace('/product/', '');

	product: Commerceproduct = this._productService.doc(this._id);

	quantities: Commerceproductquantity[] = [];

	inCart = false;

	isMenuOpen = false;

	constructor(
		private _quantityService: CommerceproductquantityService,
		private _productService: CommerceproductService,
		public cartService: CartService,
		public userService: UserService,
		private _router: Router
	) {
		this._quantityService
			.get({ query: 'product=' + this._id })
			.subscribe((quantities) => (this.quantities = quantities));
	}

	ngOnInit(): void {
		this.cartService
			.isAdded(this.product)
			.then((inCart) => (this.inCart = inCart));
	}

	back(): void {
		window.history.back();
	}
}
