import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { userlistService } from './userlist.service';

export interface userlistType {
  id: number;
  status: boolean;
  text?: string;
  img?: string;
  name: string;
  mail: string;
  role: string;
  lastActive: string;
  country: string;
  verification: string;
  verificationStatus: string;
  joinedData: string;
}
export const userlistData: userlistType[] = [
  {id: 1, status: true, text:'', img: './assets/img/faces/4.jpg', name: 'Ajanto', mail: 'ajanto.aja445@hotmail.in', role: 'Architect', lastActive: '20 days ago', country: 'France', verification:'Verified', verificationStatus: 'success', joinedData: '23-07-2021'  },
  {id: 2, status: false, text: 'w', img: '', name: 'Winters', mail: 'winters.w345@gmail.org', role: 'Front end Designer', lastActive: '20 hrs ago', country: 'Greece', verification:'Not Verified', verificationStatus: 'secondary', joinedData: '11-02-2021'  },
  {id: 3, status: false, text: 'CX', img: '', name: 'Cox', mail: 'morenocox.g111@gmail.in', role: 'Junior Technical Author', lastActive: '1 month ago', country: 'Texas', verification:'Verified', verificationStatus: 'success', joinedData: '25-05-2021'  },
  {id: 4, status: true, text: '', img: './assets/img/faces/7.jpg', name: 'Kelly', mail: 'kellybelly357@webmail.org', role: 'Senior Javascript Developer', lastActive: '36 mins ago', country: 'Columbia', verification:'Not Verified', verificationStatus: 'secondary', joinedData: '13-03-2021'  },
  {id: 5, status: true, text: '', img: './assets/img/faces/8.jpg', name: 'Satou', mail: 'satousatti3345@gmail.org', role: 'Accountant', lastActive: '11 hrs ago', country: 'Spain', verification:'Verified', verificationStatus: 'success', joinedData: '12-06-2020'  },
  {id: 6, status: true, text: '', img: './assets/img/faces/9.jpg', name: 'Williamson', mail: 'Williamson.wilson123@gmail.org', role: 'Integration Specialist', lastActive: '21 hrs ago', country: 'Bermuda', verification:'Verified', verificationStatus: 'success', joinedData: '29-01-2020'  },
  {id: 7, status: false, text: 'CH', img: '', name: 'Chandler', mail: 'Chandler.k@mobimail.in', role: 'Sales Assistant', lastActive: '28 days ago', country: 'China', verification:'Not Verified', verificationStatus: 'secondary', joinedData: '03-04-2021'  },
  {id: 8, status: true, text: '', img: './assets/img/faces/11.jpg', name: 'Davidson', mail: 'davidson.david@hotmail.com', role: 'Integration Specialist', lastActive: '14 mins ago', country: 'Portugal', verification:'Verified', verificationStatus: 'success', joinedData: '19-08-2021'  },
  {id: 9, status: false, text: 'H', img: '', name: 'Hurst', mail: 'Hurst.h@webmail.org.in', role: 'Javascript Developer', lastActive: '17 days ago', country: 'Iceland', verification:'Verified', verificationStatus: 'success', joinedData: '16-04-2021'  },
  {id: 10, status: true, text: '', img: './assets/img/faces/13.jpg', name: 'Frost', mail: 'Frostpup143@gmail.org', role: 'Software Engineer', lastActive: '19 hrs ago', country: 'India', verification:'Verified', verificationStatus: 'success', joinedData: '31-01-2021'  },
  {id: 11, status: true, text: '', img: './assets/img/faces/14.jpg', name: 'Gaines', mail: 'Gaines.j@hotmail.in', role: 'Office Manager', lastActive: '15 days ago', country: 'Romania', verification:'Not Verified', verificationStatus: 'secondary', joinedData: '27-03-2021'  },
  {id: 12, status: true, text: '', img: './assets/img/faces/15.jpg', name: 'Flynn', mail: 'flynn.gov@gmail.in', role: 'Support Lead', lastActive: '1 month ago', country: 'Japan', verification:'Verified', verificationStatus: 'success', joinedData: '23-05-2021'  },
  {id: 13, status: true, text: '', img: './assets/img/faces/16.jpg', name: 'Marshall', mail: 'Marshall@ravichandra.mail', role: 'Regional Director', lastActive: '2 days ago', country: 'Mexico', verification:'Verified', verificationStatus: 'success', joinedData: '11-07-2021'  },
  {id: 14, status: true, text: '', img: './assets/img/faces/17.jpg', name: 'Kennedy', mail: 'Kennedy@123.org.in', role: 'Senior Marketing Designer', lastActive: '12 mins ago', country: 'Italy', verification:'Verified', verificationStatus: 'success', joinedData: '26-04-2021'  },

];

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize = userlistData.length;
  countries!: userlistType[];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: userlistService) {
    this.refreshCountries();
  }

  ngOnInit(): void {
  }
  
  refreshCountries() {
    this.countries = userlistData
      .map((country, i) => ({...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
