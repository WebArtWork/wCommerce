import { CrudDocument } from 'wacom';

export interface Commerceproduct extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
