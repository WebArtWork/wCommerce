import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercewarehouseService } from '../../services/commercewarehouse.service';
import { Commercewarehouse } from '../../interfaces/commercewarehouse.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercewarehouseFormComponents } from '../../formcomponents/commercewarehouse.formcomponents';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Commerceoption } from '../../interfaces/commerceoption.interface';
import { CommerceoptionService } from '../../services/commerceoption.service';

@Component({
	templateUrl: './commerceoptions.component.html',
	styleUrls: ['./commerceoptions.component.scss'],
	standalone: false
})
export class CommerceoptionsComponent {
	columns = ['product', 'name', 'actions'];
	store: string = '';
	warehouse: string = '';

	config = {};

	options = [];

	get rows(): Commerceoption[] {
		return this.options;
	}

	skip = 0;
	perPage = 10;

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

	loadOptions(): void {
    this._commerceoptionService.getOptions(this.skip, this.perPage, this.store, this.warehouse).subscribe(
      (response: Commerceoption[]) => {
        console.log(response);
      },
      error => {
        console.error('Error fetching options', error);
      }
    );
  }

	nextPage(): void {
    if (this.skip + this.perPage < this.options.length) {
      this.skip += this.perPage;
      this.loadOptions();
    }
  }

  prevPage(): void {
    if (this.skip > 0) {
      this.skip -= this.perPage;
      this.loadOptions();
    }
  }
}
