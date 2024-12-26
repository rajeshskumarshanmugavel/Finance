import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmptyPagesComponent } from './empty-pages/empty-pages.component';
import { FaqsComponent } from './faqs/faqs.component';
import { GalleryComponent } from './gallery/gallery.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TodotaskComponent } from './todotask/todotask.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'empty-pages',
        component: EmptyPagesComponent
      },
      {
        path: 'faqs',
        component: FaqsComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'notification-list',
        component: NotificationsListComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'todo-task',
        component: TodotaskComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
