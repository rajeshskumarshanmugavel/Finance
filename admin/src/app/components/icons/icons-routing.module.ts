import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatherIconsComponent } from './feather-icons/feather-icons.component';
import { FlagIconsComponent } from './flag-icons/flag-icons.component';
import { FontAwsomeComponent } from './font-awsome/font-awsome.component';
import { IonicIconsComponent } from './ionic-icons/ionic-icons.component';
import { MaterialDesignIconsComponent } from './material-design-icons/material-design-icons.component';
import { Pe7IconsComponent } from './pe7-icons/pe7-icons.component';
import { SimpleLineIconsComponent } from './simple-line-icons/simple-line-icons.component';
import { ThemifyIconsComponent } from './themify-icons/themify-icons.component';
import { TypIconsComponent } from './typ-icons/typ-icons.component';
import { WeatherIconsComponent } from './weather-icons/weather-icons.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'font-awsome',
        component: FontAwsomeComponent
      },
      {
        path: 'material-design-icons',
        component: MaterialDesignIconsComponent
      },
      {
        path: 'simple-line',
        component: SimpleLineIconsComponent
      },
      {
        path: 'feather-icons',
        component: FeatherIconsComponent
      },
      {
        path: 'ionic-icons',
        component: IonicIconsComponent
      },
      {
        path: 'flag-icons',
        component: FlagIconsComponent
      },
      {
        path: 'pe7-icons',
        component: Pe7IconsComponent
      },
      {
        path: 'themify-icons',
        component: ThemifyIconsComponent
      },
      {
        path: 'typicons',
        component: TypIconsComponent
      },
      {
        path: 'weather-icons',
        component: WeatherIconsComponent
      },
      {
        path: 'material-icons',
        component: MaterialDesignIconsComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
