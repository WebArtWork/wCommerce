import { CrudDocument } from 'wacom';
import { Commerceproduct } from '../../commerceproduct/interfaces/commerceproduct.interface';

export interface Commerceorder extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
	products: Commerceproduct[];
	status: string;
}
