import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout-components/header/header.component';
import { FooterComponent } from './layout-components/footer/footer.component';
import { LoaderComponent } from './layout-components/loader/loader.component';
import { PageHeaderComponent } from './layout-components/page-header/page-header.component';
import { SidebarComponent } from './layout-components/sidebar/sidebar.component';
import { SwitcherComponent } from './layout-components/switcher/switcher.component';
import { TabToTopComponent } from './layout-components/tab-to-top/tab-to-top.component';
import { ContentLayoutComponent } from './layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './layout-components/layout/error-layout/error-layout.component';
import { FullLayoutComponent } from './layout-components/layout/full-layout/full-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RightSidebarComponent } from './layout-components/right-sidebar/right-sidebar.component';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { ColorPickerModule } from 'ngx-color-picker';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { SidemenuToggleDirective } from './directives/sidemenuToggle';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { SwitcherLayoutComponent } from './layout-components/layout/switcher-layout/switcher-layout.component';
import { HeaderSwitcherComponent } from './header-switcher/header-switcher.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSwitcherComponent,
    FooterComponent,
    LoaderComponent,
    PageHeaderComponent,
    SidebarComponent,
    SwitcherComponent,
    SwitcherLayoutComponent,
    TabToTopComponent,
    ContentLayoutComponent,
    ErrorLayoutComponent,
    FullLayoutComponent,
    RightSidebarComponent,
    FullscreenDirective,
    HoverEffectSidebarDirective,
    ToggleThemeDirective,
    SidemenuToggleDirective,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NgScrollbarModule,
    ColorPickerModule
  ],
  exports : [
    PageHeaderComponent, TabToTopComponent, FullLayoutComponent, ContentLayoutComponent, ErrorLayoutComponent, SwitcherComponent,SwitcherLayoutComponent, LoaderComponent
  ],
 
})
export class SharedModule { }
