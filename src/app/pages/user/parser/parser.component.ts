import { Component } from '@angular/core';

@Component({
	templateUrl: './parser.component.html',
	styleUrls: ['./parser.component.scss'],
	standalone: false
})
export class ParserComponent {
	htmlJson: string = '';
	quantityJson: string = '';
	productJson: string = '';
	parsedQuantities: any[] = [];
	parsedProducts: any[] = [];
	error: string = ''; 

	parseJson() {
		try {
			this.parsedQuantities = [];
			this.parsedProducts = [];
			this.error = '';

			const parser = new DOMParser();
			const doc = parser.parseFromString(this.htmlJson, 'text/html');

			const product = {
				name: doc.querySelector('.h1')?.textContent?.trim() || '',
				description: this.getPlainTextContent(doc.querySelector('#tab-description')) || '',
				country: this.getSiblingText(doc, 'Країна виробника'),
				volume: Number(this.getSiblingText(doc, "Об'єм")?.replace(' мл', '').trim()) || 0,
				weight: Number(this.getSiblingText(doc, 'Міцність нікотину')?.replace(' мг', '').trim()) || 0,
				price: Number(doc.querySelector('.price')?.textContent?.replace(' грн', '').trim()) || 0,
				priceType: 'piece', // Default as per schema
				thumb: doc.querySelector('img.one-img')?.getAttribute('src') || '',
				thumbs: Array.from(doc.querySelectorAll('ul#image-additional img')).map(img => img.getAttribute('src'))
			};

			this.parsedProducts.push(product);

			this.productJson = JSON.stringify(this.parsedProducts, null, 2);

			const quantityElements = doc.querySelectorAll('.hpm-type-images .hpm-item');
			quantityElements.forEach(el => {
				const quantity = {
					name: el.querySelector('img')?.getAttribute('alt') || '',
					thumb: el.querySelector('img')?.getAttribute('src') || '',
					code: 0,
					quantity: 5
				};
				this.parsedQuantities.push(quantity);
			});

			this.quantityJson = JSON.stringify(this.parsedQuantities, null, 2);
		} catch (err) {
			this.error = 'Failed to parse the HTML. Please check the format and try again.';
			console.error(err);
		}
	}

	private getPlainTextContent(element: Element | null): string {
		const clone = element?.cloneNode(true) as HTMLElement | null;
		if (clone) {
		  clone.querySelectorAll('style, script').forEach(el => el.remove());
		  return clone.textContent?.trim() || '';
		}
		return '';
	  }
	  
	private getSiblingText(doc: Document, headerText: string): string | null {
		const header = Array.from(doc.querySelectorAll('td')).find(td => td.textContent?.trim() === headerText);
		return header?.nextElementSibling?.textContent?.trim() || null;
	}

	reset() {
		this.htmlJson = '';
		this.quantityJson = '';
		this.productJson = '';
		this.parsedQuantities = [];
		this.parsedProducts = [];
		this.error = '';
	}
}