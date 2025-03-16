import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { articleFormComponents } from '../../formcomponents/article.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss'],
	standalone: false
})
export class ArticlesComponent {
	columns = ['title', 'shortDescription'];

	form: FormInterface = this._form.getForm('article', articleFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._articleService.setPerPage.bind(this._articleService),
		allDocs: false,
		create: (): void => {
			this._updateLinks({} as Article);

			this._form.modal<Article>(
				this.form,
				{
					label: 'Create',
					click: async (
						created: unknown,
						close: () => void
					): Promise<void> => {
						close();

						this._preCreate(created as Article);

						await firstValueFrom(
							this._articleService.create(created as Article)
						);

						this.setRows();
					}
				},
				{},
				(doc: Article) => {
					this._updateLinks(doc);
				}
			);
		},
		update: (doc: Article): void => {
			this._updateLinks(doc);

			this._form
				.modal<Article>(this.form, [], doc, (_doc: Article) => {
					this._updateLinks(_doc);
				})
				.then((updated: Article) => {
					this._core.copy(updated, doc);

					this._articleService.update(doc);
				});
		},
		delete: (doc: Article): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this article?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._articleService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Article): void => {
					this._form.modalUnique<Article>('article', 'url', doc);
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

	rows: Article[] = [];

	constructor(
		private _articleService: ArticleService,
		private _translate: TranslateService,
		private _route: ActivatedRoute,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this._route.paramMap.subscribe((getter) => {
			this._linkRef = getter.get('linkRef') || '';

			this._linkId = getter.get('linkId') || '';
		});

		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._articleService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Article>(create ? [] : this.rows)
				.then(async (articles: Article[]) => {
					if (create) {
						for (const article of articles) {
							this._preCreate(article);

							await firstValueFrom(
								this._articleService.create(article)
							);
						}
					} else {
						for (const article of this.rows) {
							if (
								!articles.find(
									(localArticle) =>
										localArticle._id === article._id
								)
							) {
								await firstValueFrom(
									this._articleService.delete(article)
								);
							}
						}

						for (const article of articles) {
							const localArticle = this.rows.find(
								(localArticle) =>
									localArticle._id === article._id
							);

							if (localArticle) {
								this._core.copy(article, localArticle);

								await firstValueFrom(
									this._articleService.update(localArticle)
								);
							} else {
								this._preCreate(article);

								await firstValueFrom(
									this._articleService.create(article)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _linkRef: string;

	private _linkId: string;

	private _preCreate(article: Article): void {
		delete article.__created;

		if (this._linkRef) {
			article.linkRef = article.linkRef || this._linkRef;
		}

		if (this._linkId) {
			article.linkId = article.linkId || this._linkId;
		}
	}

	private _updateLinks(article: Article): void {
		this._form.setValue(
			this.form,
			'linkRef',
			'Items',
			this._core.linkCollections
		);

		if (article.linkRef) {
			this._form.setValue(
				this.form,
				'linkId',
				'Items',
				this._core.linkIds[article.linkRef]
			);
		}
	}
}
