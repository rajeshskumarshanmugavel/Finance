import {
  Component,
  ViewEncapsulation,
  HostListener,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';
import { checkHoriMenu, parentNavActive, switcherArrowFn } from './sidebar';
import { fromEvent } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  public menuItems!: Menu[];
  public url: any;
  public windowSubscribe$!: any;
  constructor(
    private router: Router,
    private navServices: NavService,
    public elRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.checkNavActiveOnLoad();
  }
  // To set Active on Load
  checkNavActiveOnLoad() {
    this.navServices.items.subscribe((menuItems: any) => {
      this.menuItems = menuItems;

      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          let path = location.pathname.split('/');
          let eventUrl = event.url.split('/');
          if (path[path.length - 2] !== eventUrl[eventUrl.length - 2]) {
              this.closeNavActive();
              let sidemenu = document.querySelectorAll('.side-menu__item.active');
              let subSidemenu = document.querySelectorAll('.slide-item.active');
              let subSidemenu2 = document.querySelectorAll('.sub-side-menu__item2.active');
              sidemenu.forEach((e) => e.classList.remove('active'));
              subSidemenu.forEach((e) => e.classList.remove('active'));
              subSidemenu2.forEach((e) => e.classList.remove('active'));
          }
        }
        if (event instanceof NavigationEnd) {
          menuItems.filter((items: any) => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: any) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems: any) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
                if (!subSubItems.children) {
                  return false;
                }
                subSubItems?.children.filter((subSubItems1: any) => {
                  if (subSubItems1.path === event.url) {
                    this.setNavActive(subSubItems1);
                  }
                  if (!subSubItems1.children) {
                    return false;
                  }
                  return;
                });
                return;
              });
              return;
            });
            return;
          });
            setTimeout(()=>{
              if (document.querySelector('body')?.classList.contains('horizontal-hover') && window.innerWidth > 992) {
                this.closeNavActive();
                setTimeout(()=>{
                  parentNavActive();
                },100)
              } else {
                parentNavActive();
              }
            },200)
        }
      });
    });
  }

  checkCurrentActive() {
    this.navServices.items.subscribe((menuItems: any) => {
      this.menuItems = menuItems;
      let currentUrl = this.router.url;
      menuItems.filter((items: any) => {
        if (items.path === currentUrl) {
          this.setNavActive(items);
        }
        if (!items.children) {
          return false;
        }
        items.children.filter((subItems: any) => {
          if (subItems.path === currentUrl) {
            this.setNavActive(subItems);
          }
          if (!subItems.children) {
            return false;
          }
          subItems.children.filter((subSubItems: any) => {
            if (subSubItems.path === currentUrl) {
              this.setNavActive(subSubItems);
            }
          });
          return;
        });
        return;
      });
    });
  }
  //Active Nav State
  setNavActive(item: any) {
    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
        this.navServices.collapseSidebar = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
          if(submenuItems.children){
            submenuItems.children.forEach((subsubmenuItems)=>{
              if(subsubmenuItems.children && subsubmenuItems.children.includes(item)){
                menuItem.active = true;
                submenuItems.active = true;
                subsubmenuItems.active = true;
              }
            })
          }
        });
      }
    });
  }

  // Toggle menu
  toggleNavActive(item: any) {
    if (!item.active) {
      this.menuItems.forEach((a: any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if(!b.children){
            return false;
          }
          b.children.forEach((c:any)=>{
            if(b.children.includes(item)){
              c.active = false;
            }
            if(!c.children){
              return false;
            }
            return;
          })
          return;
        });
        return;
      });
    }
    item.active = !item.active;
  }

  // Close Nav menu
  closeNavActive() {
    this.menuItems.forEach((a: any) => {
      if (this.menuItems) {
        a.active = false;
      }
      if (!a.children) {
        return false;
      }
      a.children.forEach((b: any) => {
        if (a.children) {
          b.active = false;
        }
        if (!b.children) {
          return false;
        }
        b.children.forEach((c:any)=>{
          if(b.children){
            c.active = false;
          }
          if(!c.children){
            return false;
          }
          return;
        })
        return;
      });
      return;
    });
  }

  ngOnInit(): void {
    switcherArrowFn();

    fromEvent(window, 'resize').subscribe(() => {
      if (window.innerWidth >= 992) {
        document
          .querySelector('body.horizontal')
          ?.classList.remove('sidenav-toggled');
      }
      if (
        document
          .querySelector('body')
          ?.classList.contains('horizontal-hover') &&
        window.innerWidth > 992
      ) {
        let li = document.querySelectorAll('.side-menu li');
        li.forEach((e, i) => {
          e.classList.remove('is-expanded');
        });
      }
    });

    // detect screen size changes
    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          // small screen
          this.checkCurrentActive();
        } else {
          // large screen
          document
            .querySelector('body.horizontal')
            ?.classList.remove('sidenav-toggled');
          if (document.querySelector('.horizontal:not(.horizontal-hover)')) {
            this.closeNavActive();
            setTimeout(() => {
              parentNavActive();
            }, 100);
          }
        }
      });

    let vertical: any = document.querySelectorAll('#myonoffswitch34');
    let horizontal: any = document.querySelectorAll('#myonoffswitch35');
    let horizontalHover: any = document.querySelectorAll('#myonoffswitch111');
    fromEvent(vertical, 'click').subscribe(() => {
      this.checkCurrentActive();
    });
    fromEvent(horizontal, 'click').subscribe(() => {
      this.closeNavActive();
    });
    fromEvent(horizontalHover, 'click').subscribe(() => {
      this.closeNavActive();
    });

    const WindowResize = fromEvent(window, 'resize');
    // subscribing the Observable
    this.windowSubscribe$ = WindowResize.subscribe(() => {
      let menuWidth: any = document.querySelector<HTMLElement>('.main-menu');
      let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
      let mainSidemenuWidth: any = document.querySelector<HTMLElement>('.app-sidebar');
      let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
      let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0]));
      let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginRight.split('px')[0]));
      let check = menuItems.scrollWidth + ( 0 - menuWidth?.offsetWidth) + menuContainerWidth;
      if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
        document.querySelector('.slide-left')?.classList.add('d-none');
        document.querySelector('.slide-right')?.classList.add('d-none');
      }      
      // to check and adjst the menu on screen size change
      if (document.querySelector('body')?.classList.contains('ltr')) {
        if( marginLeftValue > -check == false && menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth){
          menuItems.style.marginLeft = -check+'px';
        } else {
          menuItems.style.marginLeft = 0;
        }
      } else {
        if( marginRightValue > -check == false && menuWidth?.offsetWidth < menuItems.scrollWidth){
          menuItems.style.marginRight = -check+'px';
        } else {
          menuItems.style.marginRight = 0;
        }
      }
      checkHoriMenu();
    });

    let maincontent: any = document.querySelectorAll('.main-content');
    fromEvent(maincontent, 'click').subscribe(() => {
      if (document.querySelector('body')?.classList.contains('horizontal')) {
        this.closeNavActive();
      }
    });
  }

  sidebarClose() {
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector('.app')?.classList.remove('sidenav-toggled');
      this.navServices.collapseSidebar = false;
    }
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }

  ngOnDestroy() {
    // unsubscribing the Observable
    this.windowSubscribe$.unsubscribe();
  }
}
