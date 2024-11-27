import { CrudDocument } from 'wacom';

export interface Commerceorder extends CrudDocument {
	name: string;
	description: string;
}
