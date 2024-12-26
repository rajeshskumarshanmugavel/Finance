import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImagesComponent } from './images/images.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { MediaObjectComponent } from './media-object/media-object.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TabsComponent } from './tabs/tabs.component';
import { TagsComponent } from './tags/tags.component';
import { ThumbnailsComponent } from './thumbnails/thumbnails.component';
import { ToastComponent } from './toast/toast.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TypographyComponent } from './typography/typography.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'alerts',
        component: AlertsComponent
      },
      {
        path: 'avatar',
        component: AvatarComponent
      },
      {
        path: 'badges',
        component: BadgeComponent
      },
      {
        path: 'breadcrumb',
        component: BreadCrumbsComponent
      },
      {
        path: 'buttons',
        component: ButtonsComponent
      },
      {
        path: 'dropdown',
        component: DropdownComponent
      },
      {
        path: 'images',
        component: ImagesComponent
      },
      {
        path: 'list-group',
        component: ListGroupComponent
      },
      {
        path: 'media-object',
        component: MediaObjectComponent
      },
      {
        path: 'navigation',
        component: NavigationComponent
      },
      {
        path: 'pagination',
        component: PaginationComponent
      },
      {
        path: 'popover',
        component: PopoverComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      },
      {
        path: 'spinners',
        component: SpinnersComponent
      },
      {
        path: 'tabs',
        component: TabsComponent
      },
      {
        path: 'tags',
        component: TagsComponent
      },
      {
        path: 'thumbnails',
        component: ThumbnailsComponent
      },
      {
        path: 'toast',
        component: ToastComponent
      },
      {
        path: 'tooltips',
        component: TooltipComponent
      },
      {
        path: 'typography',
        component: TypographyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementsRoutingModule { }
