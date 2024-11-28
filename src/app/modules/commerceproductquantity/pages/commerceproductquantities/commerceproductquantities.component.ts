import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceproductquantityService } from '../../services/commerceproductquantity.service';
import { Commerceproductquantity } from '../../interfaces/commerceproductquantity.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceproductquantityFormComponents } from '../../formcomponents/commerceproductquantity.formcomponents';
import { Route, Router } from '@angular/router';

@Component({
	templateUrl: './commerceproductquantities.component.html',
	styleUrls: ['./commerceproductquantities.component.scss'],
	standalone: false
})
export class CommerceproductquantitiesComponent {
	columns = ['name', 'description'];

	commerceproduct = this._router.url.includes('/commerceproductquantities/')
		? this._router.url.replace('/commerceproductquantities/', '')
		: '';

	commercestore = this._router.url.includes('/commerceproductquantities/')
		? this._router.url.replace('/commerceproductquantities/', '')
		: '';

	commercewarehouse = this._router.url.includes('/commerceproductquantities/')
		? this._router.url.replace('/commerceproductquantities/', '')
		: '';

	form: FormInterface = this._form.getForm('commerceproductquantity', commerceproductquantityFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Commerceproductquantity>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerceproduct) {
						(created as Commerceproductquantity).commerceproduct = this.commerceproduct;
					}
					if (this.commercestore) {
						(created as Commerceproductquantity).commercestore = this.commercestore;
					}
					if (this.commercewarehouse) {
						(created as Commerceproductquantity).commercewarehouse = this.commercewarehouse;
					}
					this._commerceproductquantityService.create(created as Commerceproductquantity);

					close();
				}
			});
		},
		update: (doc: Commerceproductquantity): void => {
			this._form.modal<Commerceproductquantity>(this.form, [], doc).then((updated: Commerceproductquantity) => {
				this._core.copy(updated, doc);

				this._commerceproductquantityService.update(doc);
			});
		},
		delete: (doc: Commerceproductquantity): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceproductquantity?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceproductquantityService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commerceproductquantity): void => {
					this._form.modalUnique<Commerceproductquantity>('commerceproductquantity', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	get rows(): Commerceproductquantity[] {
		return this._commerceproductquantityService.commerceproductquantitys;
	}

	constructor(
		private _translate: TranslateService,
		private _commerceproductquantityService: CommerceproductquantityService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) { }

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceproductquantity>(create ? [] : this.rows)
				.then((commerceproductquantitys: Commerceproductquantity[]) => {
					if (create) {
						for (const commerceproductquantity of commerceproductquantitys) {
							if (this.commerceproduct) {
								commerceproductquantity.commerceproduct = this.commerceproduct;
							}
							if (this.commercestore) {
								commerceproductquantity.commercestore = this.commercestore;
							} if (this.commercewarehouse) {
								commerceproductquantity.commercewarehouse = this.commercewarehouse;
							}
							this._commerceproductquantityService.create(commerceproductquantity);
						}
					} else {
						for (const commerceproductquantity of this.rows) {
							if (!commerceproductquantitys.find(
								localCommerceproductquantity => localCommerceproductquantity._id === commerceproductquantity._id
							)) {
								this._commerceproductquantityService.delete(commerceproductquantity);
							}
						}

						for (const commerceproductquantity of commerceproductquantitys) {
							const localCommerceproductquantity = this.rows.find(
								localCommerceproductquantity => localCommerceproductquantity._id === commerceproductquantity._id
							);

							if (localCommerceproductquantity) {
								this._core.copy(commerceproductquantity, localCommerceproductquantity);

								this._commerceproductquantityService.update(localCommerceproductquantity);
							} else {
								if (this.commerceproduct) {
									commerceproductquantity.commerceproduct = this.commerceproduct;
								}
								if (this.commercestore) {
									commerceproductquantity.commercestore = this.commercestore;
								} if (this.commercewarehouse) {
									commerceproductquantity.commercewarehouse = this.commercewarehouse;
								}
								commerceproductquantity.__created = false;

								this._commerceproductquantityService.create(commerceproductquantity);
							}
						}
					}
				});
		};
	}
}
