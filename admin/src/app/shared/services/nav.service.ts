import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu

export interface Menu {
	headTitle?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	badgeClass? :string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;

	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Full screen
	public fullScreen: boolean = false;

	constructor(private router: Router) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if(evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if(window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next;
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [
		{ path: '/admin/dashboard', icon: 'grid', title: 'Dashboard', type: 'link' },
		{ path: '/admin/advertiser', icon: 'users', title: 'Line', type: 'link' },
		{ path: '/admin/company', icon: 'package', title: 'Area', type: 'link' },
		{ path: '/admin/networkowner', icon: 'user-check', title: 'Expense Type', type: 'link' },
		{ path: '/admin/staff', icon: 'user', title: 'Investment Type', type: 'link' },
		{ path: '/admin/screen', icon: 'monitor', title: 'Customer', type: 'link' }
		/*{ path: '/admin/campaign', icon: 'film', title: 'Expense', type: 'link' },
		{ path: '/admin/template', icon: 'image', title: 'Templates', type: 'link' },
		{ path: '/admin/payment', icon: 'credit-card', title: 'Payments', type: 'link' },
		{ path: '/admin/report', icon: 'layers', title: 'Reports', type: 'link' },
		{ path: '/admin/ticket', icon: 'clipboard', title: 'Tickets', type: 'link' },
		{ path: '/admin/cms', icon: 'edit', title: 'CMS', type: 'link' },
		{ path: '/admin/globalconfig', icon: 'globe', title: 'Global Config', type: 'link' },
		{ path: '/admin/master', icon: 'database', title: 'Master Tables', type: 'link' },
		{ path: '/admin/registration', icon: 'check-square', title: 'Registration', type: 'link' }
		 */
	];


	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
