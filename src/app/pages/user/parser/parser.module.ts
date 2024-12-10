import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ParserComponent } from './parser.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ParserComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ParserComponent]
})
export class ParserModule {}
