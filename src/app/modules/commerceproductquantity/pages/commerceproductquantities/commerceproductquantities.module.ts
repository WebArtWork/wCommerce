import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceproductquantitiesComponent } from './commerceproductquantities.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommerceproductquantitiesComponent
	},
	{
		path: 'commerceproduct/:commerceproduct_id',
		component: CommerceproductquantitiesComponent
	},
    {
		path: 'commercestore/:commercestore_id',
		component: CommerceproductquantitiesComponent
	},
    {
		path: 'warehouse/:warehouse_id',
		component: CommerceproductquantitiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommerceproductquantitiesComponent],
	providers: []
})
export class CommerceproductquantitiesModule {}
