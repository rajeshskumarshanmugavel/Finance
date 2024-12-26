import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { AlertsComponent } from './alerts/alerts.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { BadgeComponent } from './badge/badge.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ThumbnailsComponent } from './thumbnails/thumbnails.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ImagesComponent } from './images/images.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { MediaObjectComponent } from './media-object/media-object.component';
import { TypographyComponent } from './typography/typography.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ToastComponent } from './toast/toast.component';
import { TagsComponent } from './tags/tags.component';
import { TabsComponent } from './tabs/tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AlertsComponent,
    AvatarComponent,
    BreadCrumbsComponent,
    ButtonsComponent,
    BadgeComponent,
    DropdownComponent,
    ThumbnailsComponent,
    ListGroupComponent,
    NavigationComponent,
    ImagesComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressComponent,
    SpinnersComponent,
    MediaObjectComponent,
    TypographyComponent,
    TooltipComponent,
    ToastComponent,
    TagsComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    ElementsRoutingModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
})
export class ElementsModule { }
