import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	standalone: false,
})
export class DashboardComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
