import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceproductquantitiesComponent } from './commerceproductquantities.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommerceproductquantitiesComponent
	}, {
		path: 'commerceproductquantities/:commerceproduct/:commercestore/:commercewarehouse',
		component: CommerceproductquantitiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommerceproductquantitiesComponent],
	providers: []
})
export class CommerceproductquantitiesModule { }
