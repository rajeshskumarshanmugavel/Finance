import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletMapsComponent } from './leaflet-maps/leaflet-maps.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'leaflet',
        component: LeafletMapsComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
