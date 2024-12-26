import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    document.querySelector('body')?.classList.remove('horizontal');
    document.body.className = "ltr error-page1 bg-primary"
  }

  ngOnDestroy() {
    document.body.className = "ltr main-body app sidebar-mini"
   }

}
