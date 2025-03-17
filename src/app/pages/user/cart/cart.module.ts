import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { NumberPipe } from 'wacom';

const routes: Routes = [
	{
		path: '',
		component: CartComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, NumberPipe],
	declarations: [CartComponent]
})
export class CartModule {}
