import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercelotteryparticipantService } from '../../services/commercelotteryparticipant.service';
import { Commercelotteryparticipant } from '../../interfaces/commercelotteryparticipant.interface';

@Component({
	selector: 'commercelotteryparticipant-selector',
	templateUrl: './commercelotteryparticipant-selector.component.html',
	styleUrls: ['./commercelotteryparticipant-selector.component.scss'],
	imports: [SelectModule],
})
export class CommercelotteryparticipantSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercelotteryparticipant[] {
		return this._commercelotteryparticipantService.commercelotteryparticipants;
	}

	constructor(private _commercelotteryparticipantService: CommercelotteryparticipantService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
