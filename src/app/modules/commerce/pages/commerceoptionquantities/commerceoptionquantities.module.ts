import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { Routes, RouterModule } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CommerceoptionquantitiesComponent } from './commerceoptionquantities.component';

const routes: Routes = [
	{
		path: 'product/:product_id',
		component: CommerceoptionquantitiesComponent
	},
	{
		path: 'store/:store_id',
		component: CommerceoptionquantitiesComponent
	},
	{
		path: 'warehouse/:warehouse_id',
		component: CommerceoptionquantitiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, ScrollingModule],
	declarations: [CommerceoptionquantitiesComponent
	],
	providers: []
})
export class CommerceoptionquantitiesModule {}
