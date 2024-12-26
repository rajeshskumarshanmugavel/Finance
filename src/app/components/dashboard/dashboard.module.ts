import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard01Component } from './dashboard01/dashboard01.component';
import { Dashboard02Component } from './dashboard02/dashboard02.component';
import { Dashboard03Component } from './dashboard03/dashboard03.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    Dashboard01Component,
    Dashboard02Component,
    Dashboard03Component
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot()
  ]
})
export class DashboardModule { }
