import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercebrandsComponent } from './commercebrands.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercebrandsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercebrandsComponent],
	providers: []
})
export class CommercebrandsModule {}
