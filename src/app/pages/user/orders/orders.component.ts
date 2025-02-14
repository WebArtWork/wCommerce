import { Component } from '@angular/core';
import { CommerceorderService } from 'src/app/modules/commerceorder/services/commerceorder.service';
import { CommerceproductService } from 'src/app/modules/commerceproduct/services/commerceproduct.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
	standalone: false
})
export class OrdersComponent {
	isMenuOpen = false;

	constructor(
		public productService: CommerceproductService,
		public orderService: CommerceorderService,
		public userService: UserService
	) {}

	back(): void {
		window.history.back();
	}
}
