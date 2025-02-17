import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CommerceorderService } from 'src/app/modules/commerce/services/commerceorder.service';
import { CommerceproductquantityService } from 'src/app/modules/commerce/services/commerceproductquantity.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	standalone: false
})
export class CartComponent {
	isMenuOpen = false;

	constructor(
		private _orderQuantity: CommerceproductquantityService,
		private _orderService: CommerceorderService,
		public userService: UserService,
		public cartService: CartService,
		private _router: Router
	) {}

	back(): void {
		window.history.back();
	}

	order(): void {
		// this._orderService
		// 	.create({
		// 		products: []
		// 	})
		// 	.subscribe(() => {
		// 		this._router.navigateByUrl('/orders');
		// 	});
	}
}
