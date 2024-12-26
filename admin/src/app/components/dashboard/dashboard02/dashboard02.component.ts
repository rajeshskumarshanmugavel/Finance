import { Component, OnInit } from '@angular/core';
import { budget, statistics2, weeklyVisitors } from './dashboardChartData02';

@Component({
  selector: 'app-dashboard02',
  templateUrl: './dashboard02.component.html',
  styleUrls: ['./dashboard02.component.scss']
})
export class Dashboard02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public chartOptions = statistics2;
  public budget = budget;
  public weeklyVisitors = weeklyVisitors;
}
