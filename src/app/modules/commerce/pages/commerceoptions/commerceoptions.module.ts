import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceoptionsComponent } from './commerceoptions.component';
import { Routes, RouterModule } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';

const routes: Routes = [
	{
		path: 'store/:store_id',
		component: CommerceoptionsComponent
	},
	{
		path: 'warehouse/:warehouse_id',
		component: CommerceoptionsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, ScrollingModule],
	declarations: [CommerceoptionsComponent],
	providers: []
})
export class CommerceoptionsModule {}
