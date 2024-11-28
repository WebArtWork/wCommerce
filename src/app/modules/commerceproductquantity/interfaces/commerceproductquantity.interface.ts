import { CrudDocument } from 'wacom';

export interface Commerceproductquantity extends CrudDocument {
	name: string;
	description: string;
	commerceproduct: string;
	commercestore: string;
	commercewarehouse: string;
}
