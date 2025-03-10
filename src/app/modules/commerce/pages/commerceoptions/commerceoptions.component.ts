import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommerceoptionService } from '../../services/commerceoption.service';
import { map, tap } from 'rxjs';
import { Commerceoption } from '../../interfaces/commerceoption.interface';
import { ngxCsv } from 'ngx-csv';

@Component({
  templateUrl: './commerceoptions.component.html',
  styleUrls: ['./commerceoptions.component.scss'],
  standalone: false
})
export class CommerceoptionsComponent {
  store: string = '';
  warehouse: string = '';
  options: Commerceoption[] = [];
  skip = 0;
  limit = 100;
  loading = false;

  constructor(
    private _commerceoptionService: CommerceoptionService,
    private _route: ActivatedRoute
  ) {
    this._route.paramMap.subscribe(params => {
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

    this._commerceoptionService
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

  fetchAllOptionsAndExport(): void {
    this.loading = true;
    this._commerceoptionService
      .getOptions(0, 0, this.store, this.warehouse)
      .subscribe((allOptions) => {
        this.loading = false;
        this.exportToCSV(allOptions);
      });
  }


  onQuantityChange(option: Commerceoption): void {
    this._commerceoptionService
      .setOptionsQuantity(
        option._id,
        option.product._id,
        option.quantity,
        this.store,
        this.warehouse,
      )
      .subscribe();
  }

  onScroll(index: number): void {
    if (index + this.limit / 2 >= this.options.length) {
      this.loadOptions();
    }
  }
	exportToCSV(options: Commerceoption[]): void {
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
      headers: ['ID Options', 'ID', 'Назва продукту', 'Кількість', 'Склад', 'Магазин']
    };

    const csvData = options.map(option => ({
			'Назва продукту': option.product.name,
      'Кількість': option.quantity,
      'Склад': this.warehouse,
      'Магазин': this.store,
      'ID Options': option._id,
      'ID': option.product._id,
    }));

    new ngxCsv(csvData, 'Commerce_Options_Full', csvOptions);
}
}