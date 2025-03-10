import { Injectable } from '@angular/core';
import { Commercelotteryparticipant } from '../interfaces/commercelotteryparticipant.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CommercelotteryparticipantService extends CrudService<Commercelotteryparticipant> {
	commercelotteryparticipants: Commercelotteryparticipant[] = this.getDocs();

	commercelotteryparticipantsByAuthor: Record<string, Commercelotteryparticipant[]> = {};

	constructor() {
		super({
			name: 'commercelotteryparticipant',
		});

		this.get();

		this.filteredDocuments(this.commercelotteryparticipantsByAuthor);
	}
}
