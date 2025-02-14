import { Component, Input } from '@angular/core';
import { Commerceproduct } from 'src/app/modules/commerceproduct/interfaces/commerceproduct.interface';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-product',
	standalone: false,
	templateUrl: './product.component.html',
	styleUrl: './product.component.scss'
})
export class ProductComponent {
	readonly url = environment.url;

	@Input() product: Commerceproduct;
}
