import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ScreenService } from '../components/tables/table-services/screen.service';
import { Screen } from '../components/tables/table-modal/screen.modal';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    
    numAdvertisers:number = 0;
    numAgencies:number = 0;
    numNetworkOwners:number = 0;
    numScreens:number = 0;

    screens:Screen[] = [];
    
    constructor(private http: HttpClient, public service: ScreenService) {
    }

    ngOnInit(): void {
        let light: any = document.querySelector('.color-primary-light');
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

    ngAfterViewInit() {
        this.http.get<any>('/api/getAdminDashboardData').subscribe(data => {
            this.numAdvertisers = data.numAdvertisers;
            this.numAgencies = data.numAgencies;
            this.numNetworkOwners = data.numNetworkOwners;
            this.numScreens = data.numScreens;
        });
    }
}
