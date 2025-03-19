import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommerceoptionquantityService } from '../../services/commerceoptionquantity.service';
import { map, tap } from 'rxjs';
import { Commerceoptionquantity } from '../../interfaces/commerceoptionquantity.interface';
import { ngxCsv } from 'ngx-csv';
import { CommercewarehouseService } from '../../services/commercewarehouse.service';
import { CommercestoreService } from '../../services/commercestore.service';

@Component({
	templateUrl: './commerceoptionquantities.component.html',
	styleUrls: ['./commerceoptionquantities.component.scss'],
	standalone: false
})
export class CommerceoptionquantitiesComponent implements OnInit {
	store: string = '';
	warehouse: string = '';
	options: Commerceoptionquantity[] = [];
	skip = 0;
	limit = 100;
	loading = false;

	constructor(
		private _commerceoptionquantityService: CommerceoptionquantityService,
		private _route: ActivatedRoute,
		private _ws: CommercewarehouseService,
		private _ss: CommercestoreService
	) {
		this._route.paramMap.subscribe((params) => {
			if (params.get('store_id')) {
				this.store = params.get('store_id') as string;
			} else if (params.get('warehouse_id')) {
				this.warehouse = params.get('warehouse_id') as string;
			}
		});
	}

	ngOnInit(): void {
		this.loadOptions();
	}

	loadOptions(): void {
		if (this.loading) return;

		this.loading = true;

		this._commerceoptionquantityService
			.getOptions(this.skip, this.limit, this.store, this.warehouse)
			.pipe(
				tap(() => (this.loading = false)),
				map((newOptions) => {
					this.options = [...this.options, ...newOptions];

					this.skip += this.limit;
				})
			)
			.subscribe();
	}

	export(): void {
		this.loading = true;

		this._commerceoptionquantityService
			.getOptions(0, 0, this.store, this.warehouse)
			.subscribe((allOptions) => {
				this.loading = false;

				this.exportToCSV(allOptions);
			});
	}

	import(): void {}

	onFileChange(event: any): void {
		const file = event.target.files[0];

		if (file && file.type === 'text/csv') {
			const reader = new FileReader();

			reader.onload = () => {
				const rows = (reader.result as string).split('\n');

				rows.splice(0, 3);

				const docs = rows.map((r) => {
					const fields = r.split(',');

					return {
						product: fields[0].replace(/^"|"$/g, ''),
						quantity: Number(fields[1]),
						warehouse: (fields[2] || '')
							.replace(/^"|"$/g, '')
							.trim(),
						store: (fields[3] || '').replace(/^"|"$/g, '').trim(),
						option: (fields[4] || '').replace(/^"|"$/g, ''),
						_id: (fields[5] || '').replace(/^"|"|\r$/g, '')
					};
				});

				console.log(docs.slice(0, 5));
			};

			reader.readAsText(file);
		} else {
			alert('Please upload a valid CSV file.');
		}
	}

	onQuantityChange(option: Commerceoptionquantity): void {
		this._commerceoptionquantityService
			.setOptionsQuantity(
				option._id,
				option.product._id,
				option.quantity,
				this.store,
				this.warehouse
			)
			.subscribe();
	}

	onScroll(index: number): void {
		if (index + this.limit / 2 >= this.options.length) {
			this.loadOptions();
		}
	}
	exportToCSV(options: Commerceoptionquantity[]): void {
		if (!options || options.length === 0) {
			alert('Немає даних для експорту.');

			return;
		}

		const csvOptions = {
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true,
			showTitle: true,
			title: `Список товарів - ${new Date().toLocaleString()}`,
			useTextFile: false,
			useBom: true,
			headers: [
				'Назва продукту',
				'Кількість',
				'Склад',
				'Магазин',
				'ID Options',
				'ID'
			]
		};

		const csvData = options.map((option) => ({
			'Назва продукту': option.product.name,
			Кількість: option.quantity,
			Склад:
				this._ws.commercewarehouses.find(
					(el) => el._id === this.warehouse
				)?.url || '',
			Магазин:
				this._ss.commercestores.find((el) => el._id === this.store)
					?.url || '',
			'ID Options': option._id,
			ID: option.product._id
		}));

		new ngxCsv(csvData, 'Commerce_Options_Full', csvOptions);
	}
}
