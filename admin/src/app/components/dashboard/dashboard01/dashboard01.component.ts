import { Component, OnInit } from '@angular/core';
import { chartOptions, weeklyVisitors } from './dashboardChartData';

@Component({
  selector: 'app-dashboard01',
  templateUrl: './dashboard01.component.html',
  styleUrls: ['./dashboard01.component.scss']
})
export class Dashboard01Component implements OnInit {
  constructor() { }

  ngOnInit(): void {
    let light: any = document.querySelector('.color-primary-light')
    

  }

  public chartOptions = chartOptions;
  public weeklyVisitors = weeklyVisitors;

}
