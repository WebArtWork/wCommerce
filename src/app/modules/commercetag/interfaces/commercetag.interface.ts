import { CrudDocument } from 'wacom';

export interface Commercetag extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
	parent: string;
}
