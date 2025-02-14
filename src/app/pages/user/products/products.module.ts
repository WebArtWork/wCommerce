import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ProductsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ProductsComponent]
})
export class ProductsModule {}
