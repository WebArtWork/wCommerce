import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommerceoptionService } from '../../services/commerceoption.service';
import { map, tap } from 'rxjs';
import { Commerceoption } from '../../interfaces/commerceoption.interface';

@Component({
	templateUrl: './commerceoptions.component.html',
	styleUrls: ['./commerceoptions.component.scss'],
	standalone: false
})
export class CommerceoptionsComponent {
	store: string = '';
	warehouse: string = '';

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
		this.loadOptions();
	}

	options: any[] = [];
  skip = 0;
  limit = 100;
  loading = false;

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
}
