import { Component, OnInit } from '@angular/core';
import { budget, weeklyVisitors } from './dashboardChartData03';

@Component({
  selector: 'app-dashboard03',
  templateUrl: './dashboard03.component.html',
  styleUrls: ['./dashboard03.component.scss']
})
export class Dashboard03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public budget = budget;
  public weeklyVisitors = weeklyVisitors;
}
