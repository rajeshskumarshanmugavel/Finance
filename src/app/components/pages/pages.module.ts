import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SettingsComponent } from './settings/settings.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TodotaskComponent } from './todotask/todotask.component';
import { FaqsComponent } from './faqs/faqs.component';
import { EmptyPagesComponent } from './empty-pages/empty-pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwitcherComponent } from './switcher/switcher.component';


@NgModule({
  declarations: [
    ProfileComponent,
    NotificationsListComponent,
    AboutUsComponent,
    SettingsComponent,
    InvoiceComponent,
    PricingComponent,
    GalleryComponent,
    TodotaskComponent,
    FaqsComponent,
    EmptyPagesComponent,
    SwitcherComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
    LightboxModule,
    GalleryModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
