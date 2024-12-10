import { Component } from '@angular/core';

@Component({
	templateUrl: './parser.component.html',
	styleUrls: ['./parser.component.scss'],
	standalone: false
})
export class ParserComponent {
	htmlJson: string = ''; // Input field for raw HTML
	quantityJson: string = ''; // JSON field for quantities
	productJson: string = ''; // JSON field for products
	parsedQuantities: any[] = []; // Output for parsed quantities
	parsedProducts: any[] = []; // Output for parsed products
	error: string = ''; // Error message if input is invalid

	parseJson() {
		try {
			// Clear previous results
			this.parsedQuantities = [];
			this.parsedProducts = [];
			this.error = '';

			const parser = new DOMParser();
			const doc = parser.parseFromString(this.htmlJson, 'text/html');

			// Extract Products
			const product = {
				name: doc.querySelector('.h1')?.textContent?.trim() || '',
				description: doc.querySelector('#tab-description')?.textContent?.trim() || '',
				country: this.getSiblingText(doc, 'Країна виробника'),
				volume: Number(this.getSiblingText(doc, "Об'єм")?.replace(' мл', '').trim()) || 0,
				weight: Number(this.getSiblingText(doc, 'Міцність нікотину')?.replace(' мг', '').trim()) || 0,
				price: Number(doc.querySelector('.price')?.textContent?.replace(' грн', '').trim()) || 0,
				priceType: 'piece', // Default as per schema
				thumb: doc.querySelector('img.one-img')?.getAttribute('src') || '',
				thumbs: Array.from(doc.querySelectorAll('ul#image-additional img')).map(img => img.getAttribute('src'))
			};

			this.parsedProducts.push(product);

			// Populate product JSON output
			this.productJson = JSON.stringify(this.parsedProducts, null, 2);

			// Extract Quantities
			const quantityElements = doc.querySelectorAll('.hpm-type-images .hpm-item');
			quantityElements.forEach(el => {
				const quantity = {
					name: el.querySelector('img')?.getAttribute('alt') || '',
					thumb: el.querySelector('img')?.getAttribute('src') || '',
					code: 0, // Код товару
					quantity: 5 // Default value as "В наявності більше 5 шт." in HTML
				};
				this.parsedQuantities.push(quantity);
			});

			// Populate quantity JSON output
			this.quantityJson = JSON.stringify(this.parsedQuantities, null, 2);
		} catch (err) {
			this.error = 'Failed to parse the HTML. Please check the format and try again.';
			console.error(err);
		}
	}

	/**
	 * Get the text content of a sibling cell for a given header text.
	 * @param doc - The parsed document.
	 * @param headerText - The header text to search for.
	 */
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