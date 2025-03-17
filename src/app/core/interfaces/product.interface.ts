import { CrudDocument } from 'wacom';

export interface Option extends CrudDocument {
	name: number;
	quantity: number;
}

export interface Product {
	_id: string;
	url: string;
	thumb: string;
	name: string;
	description: string;
	quantity: number;
	options: Option[];
}
