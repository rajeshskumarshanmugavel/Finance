import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-header-switcher',
  templateUrl: './header-switcher.component.html',
  styleUrls: ['./header-switcher.component.scss']
})
export class HeaderSwitcherComponent {
  private body: HTMLBodyElement | any = document.querySelector('body');
  public isCollapsed = true;
  activated: boolean = false;

  constructor(
    private layoutService: LayoutService,
    public SwitcherService: SwitcherService,
    public navServices: NavService,
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  toggleSwitcher() {
    this.SwitcherService.emitChange(true);
  }

  toggleSidebarNotification() {
    this.layoutService.emitSidebarNotifyChange(true);
  }

  signout() {
    this.auth.SignOut();
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

