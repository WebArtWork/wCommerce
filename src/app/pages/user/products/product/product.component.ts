import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-product',
	standalone: false,
	templateUrl: './product.component.html',
	styleUrl: './product.component.scss'
})
export class ProductComponent {
	readonly url = environment.url;

	@Input() product: Product;
}
