import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercetagService } from '../../services/commercetag.service';
import { Commercetag } from '../../interfaces/commercetag.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercetagFormComponents } from '../../formcomponents/commercetag.formcomponents';

@Component({
	templateUrl: './commercetags.component.html',
	styleUrls: ['./commercetags.component.scss'],
	standalone: false
})
export class CommercetagsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('commercetag', commercetagFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Commercetag>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._commercetagService.create(created as Commercetag);

					close();
				}
			});
		},
		update: (doc: Commercetag): void => {
			this._form.modal<Commercetag>(this.form, [], doc).then((updated: Commercetag) => {
				this._core.copy(updated, doc);

				this._commercetagService.update(doc);
			});
		},
		delete: (doc: Commercetag): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commercetag?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercetagService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commercetag): void => {
					this._form.modalUnique<Commercetag>('commercetag', 'url', doc);
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

	get rows(): Commercetag[] {
		return this._commercetagService.commercetags;
	}

	constructor(
		private _translate: TranslateService,
		private _commercetagService: CommercetagService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) { }

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercetag>(create ? [] : this.rows)
				.then((commercetags: Commercetag[]) => {
					if (create) {
						for (const commercetag of commercetags) {
							this._commercetagService.create(commercetag);
						}
					} else {
						for (const commercetag of this.rows) {
							if (!commercetags.find(
								localCommercetag => localCommercetag._id === commercetag._id
							)) {
								this._commercetagService.delete(commercetag);
							}
						}

						for (const commercetag of commercetags) {
							const localCommercetag = this.rows.find(
								localCommercetag => localCommercetag._id === commercetag._id
							);

							if (localCommercetag) {
								this._core.copy(commercetag, localCommercetag);

								this._commercetagService.update(localCommercetag);
							} else {
								commercetag.__created = false;

								this._commercetagService.create(commercetag);
							}
						}
					}
				});
		};
	}
}
