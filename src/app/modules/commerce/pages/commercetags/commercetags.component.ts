import { Component, OnInit } from '@angular/core';
import { AlertService, CoreService, MongoService } from 'wacom';
import { CommercetagService } from '../../services/commercetag.service';
import { Commercetag } from '../../interfaces/commercetag.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercetagFormComponents } from '../../formcomponents/commercetag.formcomponents';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './commercetags.component.html',
	styleUrls: ['./commercetags.component.scss'],
	standalone: false
})
export class CommercetagsComponent implements OnInit {
	commerce: string = '';
	parent: string = '';

	columns = ['name'];

	form: FormInterface = this._form.getForm(
		'commercetag',
		commercetagFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commercetag>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					const newCommercetag = created as Commercetag;
	
					// Додаємо commerce та parent перед створенням
					if (this.commerce) {
						newCommercetag.commerce = this.commerce;
					}
	
					if (this.parent) {
						newCommercetag.parent = this.parent;
					}
	
					// Логування перед створенням
					console.log('Creating tag with commerce:', newCommercetag);
	
					this._commercetagService.create(newCommercetag, {
						callback: () => {
							// Перевіримо, чи успішно створено
							console.log('Commercetag created successfully');
							this.setTags();
						}
					});
	
					close();
				}
			});
		},	
		update: (doc: Commercetag): void => {
			this._form
				.modal<Commercetag>(this.form, [], doc)
				.then((updated: Commercetag) => {
					this._core.copy(updated, doc);

					this._commercetagService.update(doc, {
						callback: () => {
							this.setTags();
						}
					});
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
							this._commercetagService.delete(doc, {
								callback: () => {
									this.setTags();
								}
							});
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'label_important',
				hrefFunc: this.childrenUrl.bind(this)
			},
			{
				icon: 'arrow_upward',
				click: (doc: Commercetag): void => {
					const index = this.allTags.findIndex(
						(d) => d._id === doc._id
					);

					[this.allTags[index], this.allTags[index - 1]] = [
						this.allTags[index - 1],
						this.allTags[index]
					];

					for (let i = 0; i < this.allTags.length; i++) {
						if (this.allTags[i].order !== i) {
							this.allTags[i].order = i;
							this._commercetagService.update(this.allTags[i]);
						}
					}
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Commercetag): void => {
					this._form.modalUnique<Commercetag>(
						'commercetag',
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

	get allTags(): Commercetag[] {
		return this.parent
			? this._commercetagService.commercetagsByParent[this.parent]
			: this.commerce
			? this._commercetagService.commercetagsByCommerce[this.commerce]
			: this._commercetagService.commercetags.filter(t => !t.parent);
	}

	tags: Commercetag[] = JSON.parse(
		JSON.stringify(this._commercetagService.commercetags)
	);

	setTags(): void {
		this.tags.splice(0, this.tags.length);

		for (const tag of this._commercetagService.commercetags) {
			if (!this.commerce && !this.parent) {
				if (!tag.parent) {
					this.tags.push(tag);
				}
			} else if (this.commerce && this.parent) {
				if (
					tag.parent === this.parent &&
					tag.commerce === this.commerce
				) {
					this.tags.push(tag);
				}
			} else if (this.parent) {
				if (tag.parent === this.parent) {
					this.tags.push(tag);
				}
			} else {
				if (tag.commerce === this.commerce && !tag.parent) {
					this.tags.push(tag);
				}
			}
		}
	}

	childrenUrl(tag: Commercetag): string {
		const urls = ['commerce', 'commercetags', 'parent', tag._id];

		return '/' + urls.join('/');
	}

	update(tag: Commercetag): void {
		this._commercetagService.update(tag);
	}

	constructor(
		private _translate: TranslateService,
		private _commercetagService: CommercetagService,
		private route: ActivatedRoute,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.route.paramMap.subscribe(params => {
			this.commerce = params.get('commerce_id') || environment.commerceId || '';
			console.log(this.commerce);
			this.parent = params.get('parent') || '';
			console.log(this.parent);
		});
	}

	ngOnInit(): void {
		this.setTags();
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercetag>(create ? [] : this.tags)
				.then((commercetags: Commercetag[]) => {
					if (create) {
						for (const commercetag of commercetags) {
							if (this.commerce) {
								commercetag.commerce = this.commerce;
							}
							this._commercetagService.create(commercetag);
						}
					} else {
						for (const commercetag of this.tags) {
							if (
								!commercetags.find(
									(localCommercetag) =>
										localCommercetag._id === commercetag._id
								)
							) {
								this._commercetagService.delete(commercetag);
							}
						}

						for (const commercetag of commercetags) {
							const localCommercetag = this.tags.find(
								(localCommercetag) =>
									localCommercetag._id === commercetag._id
							);

							if (localCommercetag) {
								this._core.copy(commercetag, localCommercetag);
								this._commercetagService.update(localCommercetag);
							} else {
								if (this.commerce) {
									commercetag.commerce = this.commerce;
								}

								commercetag.__created = false;
								this._commercetagService.create(commercetag);
							}
						}
					}
				});
		};
	}
}
