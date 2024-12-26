import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    WidgetsComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class WidgetsModule { }
