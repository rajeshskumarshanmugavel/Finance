import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-resister',
  templateUrl: './resister.component.html',
  styleUrls: ['./resister.component.scss']
})
export class ResisterComponent implements OnInit {

  constructor(public authService: AuthService ) { }

  ngOnInit(): void {
    document.querySelector('body')?.classList.remove('horizontal');
    document.body.className = "ltr error-page1 bg-primary"
  }

  ngOnDestroy() {
    document.body.className = "ltr main-body app sidebar-mini"
   }

}
