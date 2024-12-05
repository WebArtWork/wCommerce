import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'test',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'test'
					}
				},
				loadChildren: () =>
					import('./pages/guest/test/test.module').then(
						(m) => m.TestModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'commercecontents',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commercecontents'
					}
				},
				loadChildren: () => import('./modules/commercecontent/pages/commercecontents/commercecontents.module').then(m => m.CommercecontentsModule)
			}, 
			{
				path: 'commerceproductquantities',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commerceproductquantities'
					}
				},
				loadChildren: () => import('./modules/commerceproductquantity/pages/commerceproductquantities/commerceproductquantities.module').then(m => m.CommerceproductquantitiesModule)
			}, 
			{
				path: 'commercewarehouses',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commercewarehouses'
					}
				},
				loadChildren: () => import('./modules/commercewarehouse/pages/commercewarehouses/commercewarehouses.module').then(m => m.CommercewarehousesModule)
			}, 
			{
				path: 'commercetags',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commercetags'
					}
				},
				loadChildren: () => import('./modules/commercetag/pages/commercetags/commercetags.module').then(m => m.CommercetagsModule)
			}, 
			{
				path: 'commercestores',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commercestores'
					}
				},
				loadChildren: () => import('./modules/commercestore/pages/commercestores/commercestores.module').then(m => m.CommercestoresModule)
			}, 
			{
				path: 'commerceservices',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commerceservices'
					}
				},
				loadChildren: () => import('./modules/commerceservice/pages/commerceservices/commerceservices.module').then(m => m.CommerceservicesModule)
			},  
			{
				path: 'commerceproducts',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commerceproducts'
					}
				},
				loadChildren: () => import('./modules/commerceproduct/pages/commerceproducts/commerceproducts.module').then(m => m.CommerceproductsModule)
			}, 
			{
				path: 'commerceportfolios',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commerceportfolios'
					}
				},
				loadChildren: () => import('./modules/commerceportfolio/pages/commerceportfolios/commerceportfolios.module').then(m => m.CommerceportfoliosModule)
			}, 
			{
				path: 'commerceorders',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commerceorders'
					}
				},
				loadChildren: () => import('./modules/commerceorder/pages/commerceorders/commerceorders.module').then(m => m.CommerceordersModule)
			}, 
			{
				path: 'commercediscounts',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commercediscounts'
					}
				},
				loadChildren: () => import('./modules/commercediscount/pages/commercediscounts/commercediscounts.module').then(m => m.CommercediscountsModule)
			}, 
			{
				path: 'commercebrands',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commercebrands'
					}
				},
				loadChildren: () => import('./modules/commercebrand/pages/commercebrands/commercebrands.module').then(m => m.CommercebrandsModule)
			},
			{
				path: 'commerces',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Commerces'
					}
				},
				loadChildren: () => import('./modules/commerce/pages/commerces/commerces.module').then(m => m.CommercesModule)
			}, 
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Web Art Work',
					titleSuffix: ' | Web Art Work',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [AuthenticatedGuard, GuestGuard, AdminsGuard, { provide: LocationStrategy, useClass: HashLocationStrategy },],
	bootstrap: [AppComponent]
})
export class AppModule {}
