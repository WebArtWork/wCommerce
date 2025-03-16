import { Option, Product } from 'src/app/core/interfaces/product.interface';
import { CrudDocument } from 'wacom';

export interface Commerceorderproduct {
	product: string;
	_product?: Product;
	option: string;
	_option?: Option;
	quantity: number;
}

export interface Commerceorder extends CrudDocument {
	deviceID?: string;
	commerce: string;
	products: Commerceorderproduct[];
	status: string;
}
