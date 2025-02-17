import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MyqrComponent } from './myqr.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MyqrComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MyqrComponent]
})
export class MyqrModule {}
