import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceorderService } from '../../services/commerceorder.service';
import { Commerceorder } from '../../interfaces/commerceorder.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceorderFormComponents } from '../../formcomponents/commerceorder.formcomponents';

@Component({
	templateUrl: './commerceorders.component.html',
	styleUrls: ['./commerceorders.component.scss'],
	standalone: false
})
export class CommerceordersComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('commerceorder', commerceorderFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Commerceorder>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._commerceorderService.create(created as Commerceorder);

					close();
				}
			});
		},
		update: (doc: Commerceorder): void => {
			this._form.modal<Commerceorder>(this.form, [], doc).then((updated: Commerceorder) => {
				this._core.copy(updated, doc);

				this._commerceorderService.update(doc);
			});
		},
		delete: (doc: Commerceorder): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceorder?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceorderService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commerceorder): void => {
					this._form.modalUnique<Commerceorder>('commerceorder', 'url', doc);
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

	get rows(): Commerceorder[] {
		return this._commerceorderService.commerceorders;
	}

	constructor(
		private _translate: TranslateService,
		private _commerceorderService: CommerceorderService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) { }

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceorder>(create ? [] : this.rows)
				.then((commerceorders: Commerceorder[]) => {
					if (create) {
						for (const commerceorder of commerceorders) {
							this._commerceorderService.create(commerceorder);
						}
					} else {
						for (const commerceorder of this.rows) {
							if (!commerceorders.find(
								localCommerceorder => localCommerceorder._id === commerceorder._id
							)) {
								this._commerceorderService.delete(commerceorder);
							}
						}

						for (const commerceorder of commerceorders) {
							const localCommerceorder = this.rows.find(
								localCommerceorder => localCommerceorder._id === commerceorder._id
							);

							if (localCommerceorder) {
								this._core.copy(commerceorder, localCommerceorder);

								this._commerceorderService.update(localCommerceorder);
							} else {
								commerceorder.__created = false;

								this._commerceorderService.create(commerceorder);
							}
						}
					}
				});
		};
	}
}
