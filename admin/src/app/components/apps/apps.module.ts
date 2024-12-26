
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { CardsComponent } from './cards/cards.component';
import { DraggableCardsComponent } from './draggable-cards/draggable-cards.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ImageCompareComponent } from './image-compare/image-compare.component';
import { NotificationComponent } from './notification/notification.component';
import { WidgetNotificationComponent } from './widget-notification/widget-notification.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { Filemanager01Component } from './filemanager01/filemanager01.component';
import { Filemanager02Component } from './filemanager02/filemanager02.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxNotifierModule } from 'ngx-notifier';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxSliderModule } from 'ngx-slider-v2';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import {CdkDrag, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    CardsComponent,
    DraggableCardsComponent,
    RangeSliderComponent,
    CalendarComponent,
    ContactsComponent,
    ImageCompareComponent,
    NotificationComponent,
    WidgetNotificationComponent,
    TreeviewComponent,
    Filemanager01Component,
    Filemanager02Component,
    FileDetailsComponent
  ],
  imports: [
    NgxSliderModule,
    CommonModule,
    AppsRoutingModule,
    NgbModule,
    SharedModule,
    DragDropModule,
    FormsModule, ReactiveFormsModule,
    // PerfectScrollbarModule,
    CarouselModule,
    NgxNotifierModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,MatSnackBarModule,
    MatTreeModule, MatIconModule, MatProgressBarModule,
    GalleryModule,
    LightboxModule,
    CdkDropList,
    NgFor,
    CdkDrag,
    NgScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppsModule { }
