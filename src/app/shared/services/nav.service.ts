import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

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

export class NavService implements OnDestroy, OnInit {

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

	// Role
	role:string = "";

	MENUITEMS: Menu[] = [];

	// Array
	items:BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);;

	constructor(private router: Router, private userService: UserService) {
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
		this.initMenu();
	}

	ngOnInit(): void {
		this.initMenu();
	}

	initMenu(): void {
		console.log("Here");
		this.role = this.userService.getRole();
		console.log(this.role);
		if(this.role == "advertiser" || this.role == "agency") {
			this.MENUITEMS = [
				{ path: '/main/dashboard', icon: 'grid', title: 'Dashboard', type: 'link' },
				{ path: '/main/campaignbooking', icon: 'users', title: 'Campaign Booking', type: 'link' },
				{ path: '/main/campaigns', icon: 'film', title: 'Manage Campaigns', type: 'link' },
				{ path: '/main/reports', icon: 'film', title: 'Reports', type: 'link' },
				{
					title: 'Help & Support', icon: 'layers', type: 'sub', children: [
						{ path: '/main/userguide', title: 'User Guide', type: 'link' },
						{ path: '/main/support', title: 'Contact Support', type: 'link' },
						{ path: '/main/raiseticket', title: 'Raise Support Ticket', type: 'link' },
						{ path: '/main/tickets', title: 'My Tickets', type: 'link' },
					]
				},
				{ path: '/auth/login', icon: 'film', title: 'Signout', type: 'link' }
			];
			this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
		}
		else if(this.role == "networkowner") {
			this.MENUITEMS = [
				{ path: '/main/dashboard', icon: 'grid', title: 'Dashboard', type: 'link' },
				{ path: '/main/screens', icon: 'film', title: 'Manage Screens', type: 'link' },
				{ path: '/main/campaignapproval', icon: 'film', title: 'Campaign Approval', type: 'link' },
				{ path: '/main/livecampaigns', icon: 'film', title: 'Live Campaigns', type: 'link' },
				{ path: '/main/payments', icon: 'film', title: 'Payments', type: 'link' },
				{ path: '/main/reports', icon: 'film', title: 'Reports', type: 'link' },
				{ path: '/auth/login', icon: 'film', title: 'Signout', type: 'link' }
			];
			this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next;
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}
}
