import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { OptionsComponent } from './options.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':option_id',
		component: OptionsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [OptionsComponent],
	providers: []
})
export class OptionsModule {}
