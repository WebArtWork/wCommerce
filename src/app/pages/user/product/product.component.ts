import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Commerceproduct } from 'src/app/modules/commerceproduct/interfaces/commerceproduct.interface';
import { CommerceproductService } from 'src/app/modules/commerceproduct/services/commerceproduct.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	standalone: false
})
export class ProductComponent implements OnInit {
	readonly url = environment.url;

	product: Commerceproduct = this._productService.doc(
		this._router.url.replace('/product/', '')
	);

	inCart = false;

	isMenuOpen = false;

	constructor(
		private _productService: CommerceproductService,
		public userService: UserService,
		private _router: Router,
		private _cartService: CartService
	) {}

	ngOnInit(): void {
		this._cartService.isAdded(this.product);
	}

	back(): void {
		window.history.back();
	}

	addToCart(): void {}
}
