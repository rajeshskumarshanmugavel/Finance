import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ApexChartsComponent } from './apex-charts/apex-charts.component';
import { EChartsComponent } from './echarts/echarts.component';
import { ChartjsComponent } from './chartjs/chartjs.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApexChartsComponent,
    EChartsComponent,
    ChartjsComponent,
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FormsModule, ReactiveFormsModule
  ],
})
export class ChartsModule { }
