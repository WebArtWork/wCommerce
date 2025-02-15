import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article.interface';
import { CrudService } from 'wacom';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ArticleService extends CrudService<Article> {
	constructor() {
		super({
			appId: environment.appId,
			name: 'article'
		});
	}
}
