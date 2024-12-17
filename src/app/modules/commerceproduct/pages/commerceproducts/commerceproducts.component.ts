import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceproductService } from '../../services/commerceproduct.service';
import { Commerceproduct } from '../../interfaces/commerceproduct.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceproductFormComponents } from '../../formcomponents/commerceproduct.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './commerceproducts.component.html',
	styleUrls: ['./commerceproducts.component.scss'],
	standalone: false
})
export class CommerceproductsComponent {
	columns = ['name'];

	commerce = this._router.url.includes('/commerceproducts/')
		? this._router.url.replace('/commerceproducts/', '')
		: '';

	form: FormInterface = this._form.getForm(
		'commerceproduct',
		commerceproductFormComponents
	);

	config = {
		paginate: this.setProducts.bind(this),
		perPage: 20,
		setPerPage: this._commerceproductService.setPerPage.bind(
			this._commerceproductService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Commerceproduct>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commerceproduct).commerce = this.commerce;
					}

					this._commerceproductService.create(
						created as Commerceproduct
					);

					this.setProducts();

					close();
				}
			});
		},
		update: (doc: Commerceproduct): void => {
			this._form
				.modal<Commerceproduct>(this.form, [], doc)
				.then((updated: Commerceproduct) => {
					this._core.copy(updated, doc);

					this._commerceproductService.update(doc);
				});
		},
		delete: (doc: Commerceproduct): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceproduct?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceproductService.delete(doc);

							this.setProducts();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: '1x_mobiledata',
				hrefFunc: (doc: Commerceproduct): string => {
					return '/commerceproductquantities/product/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Commerceproduct): void => {
					this._form.modalUnique<Commerceproduct>(
						'commerceproduct',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Commerceproduct[] = [];

	private _page = 1;

	setProducts(page = this._page) {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._commerceproductService
					.get({ page })
					.subscribe((products) => {
						this.rows.splice(0, this.rows.length);

						this.rows.push(...products);
					});
			},
			250
		);
	}

	constructor(
		private _translate: TranslateService,
		private _commerceproductService: CommerceproductService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setProducts();
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceproduct>(create ? [] : this.rows)
				.then((commerceproducts: Commerceproduct[]) => {
					if (create) {
						for (const commerceproduct of commerceproducts) {
							if (this.commerce) {
								commerceproduct.commerce = this.commerce;
							}

							this._commerceproductService.create(
								commerceproduct
							);

							this.setProducts();
						}
					} else {
						for (const commerceproduct of this.rows) {
							if (
								!commerceproducts.find(
									(localCommerceproduct) =>
										localCommerceproduct._id ===
										commerceproduct._id
								)
							) {
								this._commerceproductService.delete(
									commerceproduct
								);

								this.setProducts();
							}
						}

						for (const commerceproduct of commerceproducts) {
							const localCommerceproduct = this.rows.find(
								(localCommerceproduct) =>
									localCommerceproduct._id ===
									commerceproduct._id
							);

							if (localCommerceproduct) {
								this._core.copy(
									commerceproduct,
									localCommerceproduct
								);

								this._commerceproductService.update(
									localCommerceproduct
								);
							} else {
								if (this.commerce) {
									commerceproduct.commerce = this.commerce;
								}
								commerceproduct.__created = false;

								this._commerceproductService.create(
									commerceproduct
								);

								this.setProducts();
							}
						}
					}
				});
		};
	}
}
