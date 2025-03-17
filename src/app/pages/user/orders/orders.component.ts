import { Component } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { CommerceorderService } from 'src/app/modules/commerce/services/commerceorder.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'wacom';

@Component({
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
	standalone: false
})
export class OrdersComponent {
	isMenuOpen = false;

	constructor(
		public orderService: CommerceorderService,
		public userService: UserService,
		private _http: HttpService
	) {
		this.orderService.loaded.then(this.load.bind(this));
	}

	load(): void {
		this._http
			.get('/api/commerce/products' + this._query())
			.subscribe((products: Product[]) => {
				products.forEach((p) => {
					p.quantity = p.options
						?.map((o) => o.quantity || 0)
						.reduce((acc, num) => acc + num, 0);
				});

				this.orderService.commerceorders.flatMap((item) =>
					item.products.map((p) => {
						p._product = products.find((pr) => {
							if (pr._id === p.product) {
								p._option = pr.options.find(
									(o) => o._id === p.option
								);

								return true;
							} else {
								return false;
							}
						});
					})
				);
			});
	}

	back(): void {
		window.history.back();
	}

	private _query(): string {
		return (
			'?_ids=' +
			[
				...new Set(
					this.orderService.commerceorders.flatMap((item) =>
						item.products.map((p) => p.product)
					)
				)
			].toString() +
			(environment.commerceId
				? '&commerce=' + environment.commerceId
				: '')
		);
	}
}
