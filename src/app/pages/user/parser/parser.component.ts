import { Component } from '@angular/core';
import { HttpService } from 'wacom';

@Component({
	templateUrl: './parser.component.html',
	styleUrls: ['./parser.component.scss'],
	standalone: false
})
export class ParserComponent {
	constructor(private _http: HttpService) {}

	domain: string = 'https://sigara.kiev.ua';
	htmlJson: string = '';
	quantityJson: string = '';
	productJson: string = '';
	tagsJson: string = '';
	parsedQuantities: any[] = [];
	parsedProducts: any[] = [];
	parsedTags: string[] = [];
	error: string = '';

	/**
	 * Функція отримання коректного URL зображення
	 */
	async getUrl(url: string, name = ''): Promise<string> {
		return new Promise((resolve) => {
			if (!url) {
				resolve('');
				return;
			}

			url = url.trim(); // Видаляємо зайві пробіли

			// Якщо шлях відносний — додаємо домен
			if (!url.startsWith('http') && !url.startsWith('data:')) {
				url = this.domain + url;
			}

			// Коректне кодування URI
			const encodedUrl = encodeURI(url); // encodeURI краще підходить для URL

			this._http
				.post('/api/file/photocrawl', {
					url: encodedUrl, // Передаємо закодований URL
					container: 'product',
					name
				})
				.subscribe(
					(serverUrl) => resolve(serverUrl),
					(error) => {
						console.error('Error fetching image:', decodeURIComponent(url), error);
						resolve(url); // Якщо API не працює, повертаємо оригінальний URL
					}
				);
		});
	}

	/**
	 * Основна функція парсингу HTML
	 */
	async parseJson() {
		try {
			this.parsedQuantities = [];
			this.parsedProducts = [];
			this.parsedTags = [];
			this.error = '';

			const parser = new DOMParser();
			const doc = parser.parseFromString(this.htmlJson, 'text/html');


			const allTags = [
				'POD - системи',
				'POD - системи / Ibar',
				'POD - системи / Lost vape',
				'POD - системи / OXVA',
				'POD - системи / Smok',
				'POD - системи / Vaporesso',
				'POD - системи / Voopoo',
				'Випарники, картриджі',
				'Електронні сигарети з вітамінами',
				'Електронні сигарети з вітамінами / Nutriair',
				'Електронні сигарети з вітамінами / Nutriair 3XL',
				'Електронні сигарети з вітамінами / Nutriair XL',
				'Електронні сигарети з вітамінами / Nutriair XXL',
				'За Брендами',
				'За Брендами / ARK',
				'За Брендами / Ark Drops',
				'За Брендами / Aspire',
				'За Брендами / Ego',
				'За Брендами / Eleaf',
				'За Брендами / Geekvape',
				'За Брендами / Hotcig',
				'За Брендами / IJOY',
				'За Брендами / JoyeTech',
				'За Брендами / Justfog',
				'За Брендами / Kangertech',
				'За Брендами / Logic',
				'За Брендами / Myle',
				'За Брендами / Ovns',
				'За Брендами / Sigelei',
				'За Брендами / Smoant',
				'За Брендами / Suorin',
				'За Брендами / THC',
				'За Брендами / Tesla',
				'За Брендами / UD',
				'За Брендами / Uwell',
				'За Брендами / Vandy Vape',
				'За Брендами / Wismec',
				'За Брендами / Wotofo',
				'За Брендами / Для досвідчених вейперів',
				'За Брендами / Жіночі',
				'Набори для самозамісу ( конструктори)',
				'Набори для самозамісу ( конструктори) / Набор A.R.T',
				'Набори для самозамісу ( конструктори) / Набор Fluffy Puff',
				'Набори для самозамісу ( конструктори) / Набор In Bottle Parallel',
				'Набори для самозамісу ( конструктори) / Набір Alchemist',
				'Набори для самозамісу ( конструктори) / Набір Alchemist FL',
				'Набори для самозамісу ( конструктори) / Набір Chaser Black',
				'Набори для самозамісу ( конструктори) / Набір Chaser For Pods',
				'Набори для самозамісу ( конструктори) / Набір Chaser Lux',
				'Набори для самозамісу ( конструктори) / Набір Chaser Mix',
				'Набори для самозамісу ( конструктори) / Набір Chaser Special Berry',
				'Набори для самозамісу ( конструктори) / Набір Hype Kit',
				'Набори для самозамісу ( конструктори) / Набір In Bottle Puzzle',
				'Набори для самозамісу ( конструктори) / Набір JUNI',
				'Набори для самозамісу ( конструктори) / Набір MIX BAR',
				'Набори для самозамісу ( конструктори) / Набір MOLECULON',
				'Набори для самозамісу ( конструктори) / Набір Manoli',
				'Набори для самозамісу ( конструктори) / Набір New Way',
				'Набори для самозамісу ( конструктори) / Набір OCTO BAR',
				'Набори для самозамісу ( конструктори) / Набір ULIQ',
				'Набори для самозамісу ( конструктори) / Набір Yum-Yum Star',
				'Нікотинові подушечки ( Паучі)',
				'Одноразові Pod системи',
				'Одноразові Pod системи / Airis',
				'Одноразові Pod системи / Aroma King',
				'Одноразові Pod системи / Elf Bar',
				'Одноразові Pod системи / HQD',
				'Одноразові Pod системи / Lost Mary',
				'Одноразові Pod системи / Priv Bar',
				'Одноразові Pod системи / Smok',
				'Одноразові Pod системи / VAAL',
				'Одноразові Pod системи / Vozol',
				'Одноразові Pod системи / YooZ',
				'Одноразові Pod системи / Одноразка 0мг. Без нікотину',
				'Рідини для електронних сигарет',
				'Рідини для електронних сигарет / Рідини органічні',
				'Рідини для електронних сигарет / Сольова рідина',
				'Самозаміс',
				'Самозаміс / Аромабустери',
				'Самозаміс / Ароматизатори',
				'Самозаміс / Гліцерин',
				'Самозаміс / Нікобустер',
				'Самозаміс / Нікотин',
				'Самозаміс / Пропіленгліколь',
				'Самозаміс / Тара та упаковка'
			];

			const product = {
				name: doc.querySelector('.card__name')?.textContent?.trim() || '',
				description: this.getPlainTextContent(doc.querySelector('#description')) || '',
				price: Number(doc.querySelector('[itemprop="price"]')?.textContent?.trim()) || 0,
				priceType: 'piece',
				thumb: doc.querySelector('.card__slider-item img')?.getAttribute('src') || '',
				thumbs: Array.from(doc.querySelectorAll('.card__preview-item img')).map((img) => img.getAttribute('src') || ''),
				country: this.getSiblingText(doc, 'Виробник') || 'Unknown',
				volume: Number(this.getSiblingText(doc, 'Картридж')?.replace(' мл', '').trim()) || 0,
				weight: Number(this.getSiblingText(doc, 'Вага')?.replace(' г', '').trim()) || 0,
				battery: this.getSiblingText(doc, 'Батарея (ємність)') || 'Unknown',
				power: this.getSiblingText(doc, 'Потужність') || 'Unknown',
				atomizerType: this.getSiblingText(doc, 'Вигляд атомайзера') || 'Unknown',
				warranty: this.getSiblingText(doc, 'Гарантія') || 'Unknown',
				type: this.getSiblingText(doc, 'Тип') || 'Unknown',
				tags: [] as string[]
			};

			// Завантажуємо головне фото товару
			if (product.thumb) {
				product.thumb = await this.getUrl(product.thumb);
			}

			// Завантажуємо всі мініатюри товару
			for (let i = 0; i < product.thumbs.length; i++) {
				if (product.thumbs[i]) {
					product.thumbs[i] = await this.getUrl(product.thumbs[i] as string);
				}
			}

			// Обробка фото productquantity (варіанти товару)
			const quantityElements = doc.querySelectorAll('.card__options-item');

			for (let i = 0; i < quantityElements.length; i++) {
				const quantityThumb = quantityElements[i].querySelector('img')?.getAttribute('src') || '';

				// Отримуємо правильний URL
				const fixedThumb = await this.getUrl(quantityThumb);

				const quantity = {
					name: quantityElements[i].querySelector('a')?.getAttribute('title') || '',
					thumb: fixedThumb, // Оновлений URL
					code: 0,
					quantity: 5 // Значення за замовчуванням
				};

				this.parsedQuantities.push(quantity);
			}

			// Конвертуємо результати у JSON
			this.productJson = JSON.stringify([product], null, 2);
			this.quantityJson = JSON.stringify(this.parsedQuantities, null, 2);

		} catch (err) {
			this.error = 'Помилка під час парсингу HTML. Перевірте формат і спробуйте ще раз.';
			console.error(err);
		}
	}

	/**
	 * Видаляє теги script та style і повертає чистий текст
	 */
	private getPlainTextContent(element: Element | null): string {
		const clone = element?.cloneNode(true) as HTMLElement | null;
		if (clone) {
			clone.querySelectorAll('style, script').forEach((el) => el.remove());
			return clone.textContent?.trim() || '';
		}
		return '';
	}

	/**
	 * Отримує текст сусіднього <b> елемента, шукаючи за заголовком у списку
	 */
	private getSiblingText(doc: Document, label: string): string | null {
		const element = Array.from(doc.querySelectorAll('li')).find((li) => li.textContent?.trim().startsWith(label));
		return element?.querySelector('b')?.textContent?.trim() || null;
	}

	/**
	 * Скидання даних
	 */
	reset() {
		this.htmlJson = '';
		this.quantityJson = '';
		this.productJson = '';
		this.tagsJson = '';
		this.parsedQuantities = [];
		this.parsedProducts = [];
		this.parsedTags = [];
		this.error = '';
	}
}
