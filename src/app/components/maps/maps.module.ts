import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { LeafletMapsComponent } from './leaflet-maps/leaflet-maps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LeafletMapsComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    SharedModule,
    HttpClientModule,
    LeafletModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class MapsModule { }
