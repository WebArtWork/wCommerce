import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CartComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CartComponent]
})
export class CartModule {}
