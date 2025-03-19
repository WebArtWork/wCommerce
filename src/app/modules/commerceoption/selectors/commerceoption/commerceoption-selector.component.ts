import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceoptionService } from '../../services/commerceoption.service';
import { Commerceoption } from '../../interfaces/commerceoption.interface';

@Component({
	selector: 'commerceoption-selector',
	templateUrl: './commerceoption-selector.component.html',
	styleUrls: ['./commerceoption-selector.component.scss'],
	imports: [SelectModule],
})
export class CommerceoptionSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerceoption[] {
		return this._commerceoptionService.commerceoptions;
	}

	constructor(private _commerceoptionService: CommerceoptionService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
