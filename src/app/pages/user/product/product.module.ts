import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ProductComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ProductComponent]
})
export class ProductModule {}
