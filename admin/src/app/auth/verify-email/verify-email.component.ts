import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService, private _location: Location) { }

  ngOnInit(): void {
    document.querySelector('body')?.classList.remove('horizontal');
    document.body.className = "ltr error-page1 bg-primary"
  }

  ngOnDestroy() {
    document.body.className = "ltr main-body app sidebar-mini"
   }
  
  backClicked() {
    this._location.back();
  }
}
