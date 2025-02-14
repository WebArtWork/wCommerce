import { UserService } from 'src/app/modules/user/services/user.service';
import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	ViewChild
} from '@angular/core';
import QRCode from 'qrcode';

@Component({
	templateUrl: './myqr.component.html',
	styleUrls: ['./myqr.component.scss'],
	standalone: false
})
export class MyqrComponent implements AfterViewInit {
	@ViewChild('canvas', { static: false }) canvas!: ElementRef;

	@HostListener('window:resize', ['$event']) resize(): void {
		this.ngAfterViewInit();
	}

	ngAfterViewInit(): void {
		const canvas = this.canvas.nativeElement;

		const size = Math.min(window.innerWidth, window.innerHeight) * 0.8; // 80% of the smallest screen dimension

		canvas.width = size;

		canvas.height = size;

		QRCode.toCanvas(canvas, this._userService.user._id, {
			width: size
		});
	}

	constructor(private _userService: UserService) {}
}
