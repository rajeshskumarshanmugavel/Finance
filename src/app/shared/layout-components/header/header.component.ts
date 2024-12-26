import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/firebase/auth.service';
import { LayoutService } from '../../services/layout.service';
import { NavService } from '../../services/nav.service';
import { SwitcherService } from '../../services/switcher.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private body: HTMLBodyElement | any = document.querySelector('body');
  public isCollapsed = true;
  activated: boolean = false;

  scrolled: boolean = false;

  firstName:string = "";
  lastName:string = "";
  role:string = "";

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }

  constructor(
    private layoutService: LayoutService,
    public SwitcherService: SwitcherService,
    public navServices: NavService,
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.firstName = this.userService.getFirstName();
    this.lastName = this.userService.getLastName();
    var role = this.userService.getRole();
    this.role = (role == "networkowner"? "Network Owner" : (role == "advertiser"? "Advertiser":"Agency"));
  }
  toggleSwitcher() {
    this.SwitcherService.emitChange(true);
  }
  
  toggleSidebarNotification() {
    this.layoutService.emitSidebarNotifyChange(true);
  }

  signout() {
    //this.auth.SignOut();
    this.userService.setUser(0, "", "", "", "", "", "");
    this.router.navigate(['/auth/login']);
  }

  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'modalCusSty',
    });
  }

  searchToggle() {
    if(this.body.classList.contains('search-open')){
      this.activated = false;
      this.body.classList.remove('search-open')
    }
    else{
      this.activated = true;
      this.body.classList.add('search-open')
    }
  }
  closeToggle() { 
    this.activated = false;
    this.body.classList.remove('search-open')
  }
}
