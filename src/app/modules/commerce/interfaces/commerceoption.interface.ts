import { CrudDocument } from 'wacom';
import { Commerceproduct } from './commerceproduct.interface';

export interface Commerceoption extends CrudDocument {
	name: string,
	description: string,
	color: string,
	size: string,
	thumb: string,
	code: number,
  product: Commerceproduct,
	quantity: number;
	warehouse?: { url: string };
  store?: { url: string };
}
