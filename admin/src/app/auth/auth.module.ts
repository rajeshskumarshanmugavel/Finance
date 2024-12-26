import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login/login.component';
import { ResisterComponent } from './resister/resister.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResisterComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
