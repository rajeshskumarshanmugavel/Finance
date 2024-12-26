import { Component, OnInit } from '@angular/core';
import { defaultTable1, defaultTable2, DefaultTableDataList1, DefaultTableDataList2 } from './defaultTableData';

@Component({
  selector: 'app-default-tables',
  templateUrl: './default-tables.component.html',
  styleUrls: ['./default-tables.component.scss']
})
export class DefaultTablesComponent implements OnInit {
  public DefaultTableData: defaultTable1[];
  public DefaultTableData2: defaultTable2[];
  constructor() { 
    this.DefaultTableData = DefaultTableDataList1
    this.DefaultTableData2 = DefaultTableDataList2
  }

  ngOnInit(): void {
  }

}
