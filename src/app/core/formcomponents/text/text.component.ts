import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss'],
	standalone: false
})
export class TextComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Text', this.templateRef);
	}
}
