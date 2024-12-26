import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
//import { budget, statistics2, weeklyVisitors } from './dashboardChartData02';
import { UserService } from 'src/app/user.service';
import { Screen } from '../components/tables/table-modal/screen.modal';
import { ScreenService } from '../components/tables/table-services/screen.service';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  
  role: string = "";
  screens:Screen[] = [];

  constructor(private http: HttpClient, private userService: UserService, public service: ScreenService) { }

  ngOnInit(): void {
      this.role = this.userService.getRole();
      console.log(this.role);
      let light: any = document.querySelector('.color-primary-light')
      this.refreshData();
  }

  refreshData() {
    this.http.get<any>('/api/screen').subscribe(data => {
        this.screens = data as Screen[];
        this.service.setScreens(this.screens);
    });
}

onSort({column, direction}: SortEvent | any) {
    this.headers.forEach(header => {
        if(header.sortable !== column) {
            header.direction = '';
        }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
}

  //public chartOptions = statistics2;
  //public budget = budget;
  //public weeklyVisitors = weeklyVisitors;
}
