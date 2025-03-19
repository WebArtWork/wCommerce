import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceoptionService } from '../../services/commerceoption.service';
import { Commerceoption } from '../../interfaces/commerceoption.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceoptionFormComponents } from '../../formcomponents/commerceoption.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './options.component.html',
	styleUrls: ['./options.component.scss'],
	standalone: false,
})
export class OptionsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('commerceoption', commerceoptionFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._commerceoptionService.setPerPage.bind(this._commerceoptionService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Commerceoption>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Commerceoption);

					await firstValueFrom(
						this._commerceoptionService.create(created as Commerceoption)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Commerceoption): void => {
			this._form
				.modal<Commerceoption>(this.form, [], doc)
				.then((updated: Commerceoption) => {
					this._core.copy(updated, doc);

					this._commerceoptionService.update(doc);
				});
		},
		delete: (doc: Commerceoption): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceoption?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._commerceoptionService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commerceoption): void => {
					this._form.modalUnique<Commerceoption>('commerceoption', 'url', doc);
				},
			},
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
		],
	};

	rows: Commerceoption[] = [];

	constructor(
		private _translate: TranslateService,
		private _commerceoptionService: CommerceoptionService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._commerceoptionService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceoption>(create ? [] : this.rows)
				.then(async (commerceoptions: Commerceoption[]) => {
					if (create) {
						for (const commerceoption of commerceoptions) {
							this._preCreate(commerceoption);

							await firstValueFrom(
								this._commerceoptionService.create(commerceoption)
							);
						}
					} else {
						for (const commerceoption of this.rows) {
							if (
								!commerceoptions.find(
									(localCommerceoption) => localCommerceoption._id === commerceoption._id
								)
							) {
								await firstValueFrom(
									this._commerceoptionService.delete(commerceoption)
								);
							}
						}

						for (const commerceoption of commerceoptions) {
							const localCommerceoption = this.rows.find(
								(localCommerceoption) => localCommerceoption._id === commerceoption._id
							);

							if (localCommerceoption) {
								this._core.copy(commerceoption, localCommerceoption);

								await firstValueFrom(
									this._commerceoptionService.update(localCommerceoption)
								);
							} else {
								this._preCreate(commerceoption);

								await firstValueFrom(
									this._commerceoptionService.create(commerceoption)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(commerceoption: Commerceoption): void {
		delete commerceoption.__created;
	}
}
