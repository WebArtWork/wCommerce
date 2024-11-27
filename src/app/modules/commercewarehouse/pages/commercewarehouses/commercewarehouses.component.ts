import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercewarehouseService } from '../../services/commercewarehouse.service';
import { Commercewarehouse } from '../../interfaces/commercewarehouse.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercewarehouseFormComponents } from '../../formcomponents/commercewarehouse.formcomponents';

@Component({
	templateUrl: './commercewarehouses.component.html',
	styleUrls: ['./commercewarehouses.component.scss'],
	standalone: false
})
export class CommercewarehousesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('commercewarehouse', commercewarehouseFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Commercewarehouse>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._commercewarehouseService.create(created as Commercewarehouse);

					close();
				}
			});
		},
		update: (doc: Commercewarehouse): void => {
			this._form.modal<Commercewarehouse>(this.form, [], doc).then((updated: Commercewarehouse) => {
				this._core.copy(updated, doc);

				this._commercewarehouseService.update(doc);
			});
		},
		delete: (doc: Commercewarehouse): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commercewarehouse?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercewarehouseService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commercewarehouse): void => {
					this._form.modalUnique<Commercewarehouse>('commercewarehouse', 'url', doc);
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

	get rows(): Commercewarehouse[] {
		return this._commercewarehouseService.commercewarehouses;
	}

	constructor(
		private _translate: TranslateService,
		private _commercewarehouseService: CommercewarehouseService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) { }

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercewarehouse>(create ? [] : this.rows)
				.then((commercewarehouses: Commercewarehouse[]) => {
					if (create) {
						for (const commercewarehouse of commercewarehouses) {
							this._commercewarehouseService.create(commercewarehouse);
						}
					} else {
						for (const commercewarehouse of this.rows) {
							if (!commercewarehouses.find(
								localCommercewarehouse => localCommercewarehouse._id === commercewarehouse._id
							)) {
								this._commercewarehouseService.delete(commercewarehouse);
							}
						}

						for (const commercewarehouse of commercewarehouses) {
							const localCommercewarehouse = this.rows.find(
								localCommercewarehouse => localCommercewarehouse._id === commercewarehouse._id
							);

							if (localCommercewarehouse) {
								this._core.copy(commercewarehouse, localCommercewarehouse);

								this._commercewarehouseService.update(localCommercewarehouse);
							} else {
								commercewarehouse.__created = false;

								this._commercewarehouseService.create(commercewarehouse);
							}
						}
					}
				});
		};
	}
}
