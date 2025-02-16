import { Component } from '@angular/core';
import { CoreService } from 'wacom';
import { CommerceService } from './modules/commerce/services/commerce.service';
import { UserService } from './modules/user/services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: false
})
export class AppComponent {
	constructor(
		private _commerceService: CommerceService,
		private _userService: UserService,
		private _core: CoreService
	) {
		this._core.addLink('Commerce', () => {
			return this._commerceService.commercesByAuthor[
				this._userService.user._id
			].map((c) => {
				return {
					name: c.name,
					_id: c._id
				};
			});
		});
	}
}
