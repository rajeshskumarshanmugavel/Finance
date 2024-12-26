import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/firebase/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public show: boolean = false;
    public loginForm: FormGroup | any;
    public errorMessage: any;
    public _error : any

    constructor(public authService: AuthService, private fb: FormBuilder, private modalService: NgbModal,
                private http: HttpClient, private userService: UserService, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        document.querySelector('body')?.classList.remove('horizontal');
        document.body.className = "ltr error-page1 bg-primary"
    }

    ngOnDestroy() {
        document.body.className = "ltr main-body app sidebar-mini"
    }

    showPassword() {
        this.show = !this.show;
    }

    // Login With Google
    loginGoogle() {
        this.authService.GoogleAuth();
    }

    // Login With Twitter
    loginTwitter(): void {
        this.authService.signInTwitter();
    }

    // Login With Facebook
    loginFacebook() {
        this.authService.signInFacebok();
    }

    // Simple Login
    login() {
        //this.authService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']);
        /*
        .then(() => {
          console.clear();
        })
        .catch((_error: any) => {
          this._error = _error;
        });;
        */

        console.log(this.loginForm.value.username);
        console.log(this.loginForm.value.password);

        this.errorMessage = "";

        var queryString = "?username=" + this.loginForm.value.username + "&&password=" + this.loginForm.value.password;
        this.http.get<any>('/api/login' + queryString).subscribe(data => {
            console.log(data);
            if(data.status == true) {
                this.userService.setUser(data.id, this.loginForm.value.username, data.authToken, data.firstName, data.lastName, data.role, data.role2);
                console.log("role: " + this.userService.getRole());
                console.log("role2: " + this.userService.getRole());
                this.router.navigate(["../main"]);
            }
            else {
                this.errorMessage = "Invalid username/password";
                console.log(this.errorMessage);
            }
        });
    }
}
