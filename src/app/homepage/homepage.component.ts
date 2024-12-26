import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  
  constructor(private router: Router) {
  }

  onLogin() {
      this.router.navigate(["../auth/login"]);
  }

  onRegisterAdvertiser() {
      this.router.navigate(["../auth/register/Advertiser"]);
  }
  onRegisterAgency() {
      this.router.navigate(["../auth/register/Agency"]);
  }
  onRegisterNetworkOwner() {
      this.router.navigate(["../auth/register/NetworkOwner"]);
  }
}
