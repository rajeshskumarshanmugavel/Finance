import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogComponent } from './blog/blog.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseComponent } from './collapse/collapse.component';
import { CountersComponent } from './counters/counters.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FileAttachmentsComponent } from './file-attachments/file-attachments.component';
import { ModalsComponent } from './modals/modals.component';
import { RatingsComponent } from './ratings/ratings.component';
import { SearchComponent } from './search/search.component';
import { SweetAlertsComponent } from './sweet-alerts/sweet-alerts.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UserlistComponent } from './userlist/userlist.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'accordion',
        component: AccordionComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'blog-details',
        component: BlogDetailsComponent
      },
      {
        path: 'carousel',
        component: CarouselComponent
      },
      {
        path: 'collapse',
        component: CollapseComponent
      },
      {
        path: 'counters',
        component: CountersComponent
      },
      {
        path: 'edit-post',
        component: EditPostComponent
      },
      {
        path: 'file-attachments',
        component: FileAttachmentsComponent
      },
      {
        path: 'modals',
        component: ModalsComponent
      },
      {
        path: 'ratings',
        component : RatingsComponent
      },
      {
        path: 'search',
        component : SearchComponent
      },
      {
        path: 'sweet-alert',
        component: SweetAlertsComponent
      },
      {
        path: 'timeline',
        component: TimelineComponent
      },
      {
        path: 'userlist',
        component: UserlistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedUiRoutingModule { }
