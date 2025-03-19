import { Injectable } from '@angular/core';
import { Commerceoption } from '../interfaces/commerceoption.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CommerceoptionService extends CrudService<Commerceoption> {
	constructor() {
		super({
			name: 'commerceoption',
		});
	}
}
