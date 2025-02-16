import { Component } from '@angular/core';
import { CoreService } from 'wacom';
import { CommerceService } from './modules/commerce/services/commerce.service';
import { UserService } from './modules/user/services/user.service';
import { Selectitem } from 'wacom/lib/interfaces/select.item.interface';

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
		this.addLink('Commerce', this.commerce.bind(this));

		this._core.onComplete('commerceLoaded').then(() => {
			console.log('onComplete');
		});

		this._core.on('commerce_changed').subscribe(() => {
			console.log('on changed');
		});

		console.log(this._core);
	}

	commerce(): Selectitem[] {
		console.log(
			this._commerceService.commercesByAuthor[
				this._userService.user._id
			].map((c) => {
				return {
					name: c.name,
					_id: c._id
				};
			})
		);

		console.log(
			this._commerceService.commercesByAuthor[this._userService.user._id]
		);

		return this._commerceService.commercesByAuthor[
			this._userService.user._id
		].map((c) => {
			return {
				name: c.name,
				_id: c._id
			};
		});
	}

	addLink(name: string, reset: () => Selectitem[], realName = ''): void {
		this._core.linkCollections.push(name);

		this._core.linkRealCollectionName[name] = realName || name;

		this._core
			.onComplete(name.toLowerCase() + 'commerceLoaded')
			.then(() => {
				this._core.linkIds[name] = reset();

				console.log('onloaded');
			});

		this._core.on(name.toLowerCase() + '_changed').subscribe(() => {
			this._core.linkIds[name].splice(0, this._core.linkIds[name].length);

			this._core.linkIds[name].push(...reset());

			console.log('on change');
		});

		console.log(name.toLowerCase() + 'Loaded');
		console.log(name.toLowerCase() + '_changed');
	}
}
