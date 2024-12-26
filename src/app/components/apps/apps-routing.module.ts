import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CardsComponent } from './cards/cards.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraggableCardsComponent } from './draggable-cards/draggable-cards.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { Filemanager01Component } from './filemanager01/filemanager01.component';
import { Filemanager02Component } from './filemanager02/filemanager02.component';
import { ImageCompareComponent } from './image-compare/image-compare.component';
import { NotificationComponent } from './notification/notification.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { WidgetNotificationComponent } from './widget-notification/widget-notification.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'cards',
        component: CardsComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },{
        path: 'dragula-cards',
        component: DraggableCardsComponent
      },
      {
        path: 'image-compare',
        component: ImageCompareComponent
      },
      {
        path: 'notifications',
        component: NotificationComponent
      },
      {
        path: 'range-slider',
        component: RangeSliderComponent
      },
      {
        path: 'treeview',
        component: TreeviewComponent
      },
      {
        path: 'widget-notification',
        component: WidgetNotificationComponent
      },
      {
        path: 'file-manager01',
        component: Filemanager01Component
      },
      {
        path: 'file-manager02',
        component: Filemanager02Component
      },
      {
        path: 'file-details',
        component: FileDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
