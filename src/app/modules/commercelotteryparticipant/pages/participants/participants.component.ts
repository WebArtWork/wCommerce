import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercelotteryparticipantService } from '../../services/commercelotteryparticipant.service';
import { Commercelotteryparticipant } from '../../interfaces/commercelotteryparticipant.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercelotteryparticipantFormComponents } from '../../formcomponents/commercelotteryparticipant.formcomponents';

@Component({
	templateUrl: './participants.component.html',
	styleUrls: ['./participants.component.scss'],
	standalone: false
})
export class ParticipantsComponent {
	columns = ['phone', 'google', 'telegram', 'screenshots', 'stores'];

	fullImage = '';

	form: FormInterface = this._form.getForm(
		'commercelotteryparticipant',
		commercelotteryparticipantFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commercelotteryparticipant>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Commercelotteryparticipant);

					this._commercelotteryparticipantService.create(
						created as Commercelotteryparticipant
					);

					close();
				}
			});
		},
		update: (doc: Commercelotteryparticipant): void => {
			this._form
				.modal<Commercelotteryparticipant>(this.form, [], doc)
				.then((updated: Commercelotteryparticipant) => {
					this._core.copy(updated, doc);

					this._commercelotteryparticipantService.update(doc);
				});
		},
		delete: (doc: Commercelotteryparticipant): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this participant?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercelotteryparticipantService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commercelotteryparticipant): void => {
					this._form.modalUnique<Commercelotteryparticipant>(
						'commercelotteryparticipant',
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

	get rows(): Commercelotteryparticipant[] {
		return this._commercelotteryparticipantService
			.commercelotteryparticipants;
	}

	constructor(
		private _translate: TranslateService,
		private _commercelotteryparticipantService: CommercelotteryparticipantService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercelotteryparticipant>(create ? [] : this.rows)
				.then(
					(
						commercelotteryparticipants: Commercelotteryparticipant[]
					) => {
						if (create) {
							for (const commercelotteryparticipant of commercelotteryparticipants) {
								this._preCreate(commercelotteryparticipant);

								this._commercelotteryparticipantService.create(
									commercelotteryparticipant
								);
							}
						} else {
							for (const commercelotteryparticipant of this
								.rows) {
								if (
									!commercelotteryparticipants.find(
										(localCommercelotteryparticipant) =>
											localCommercelotteryparticipant._id ===
											commercelotteryparticipant._id
									)
								) {
									this._commercelotteryparticipantService.delete(
										commercelotteryparticipant
									);
								}
							}

							for (const commercelotteryparticipant of commercelotteryparticipants) {
								const localCommercelotteryparticipant =
									this.rows.find(
										(localCommercelotteryparticipant) =>
											localCommercelotteryparticipant._id ===
											commercelotteryparticipant._id
									);

								if (localCommercelotteryparticipant) {
									this._core.copy(
										commercelotteryparticipant,
										localCommercelotteryparticipant
									);

									this._commercelotteryparticipantService.update(
										localCommercelotteryparticipant
									);
								} else {
									this._preCreate(commercelotteryparticipant);

									this._commercelotteryparticipantService.create(
										commercelotteryparticipant
									);
								}
							}
						}
					}
				);
		};
	}

	private _preCreate(
		commercelotteryparticipant: Commercelotteryparticipant
	): void {
		delete commercelotteryparticipant.__created;
	}
}
