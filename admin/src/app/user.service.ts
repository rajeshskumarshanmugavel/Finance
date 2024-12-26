import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    id:number = -1;
    username:string = "";
    authToken:string = "";
    firstName:string = "";
    lastName:string = "";
    role = "";
    role2 = "";

    constructor() { }

    setUser(id:number, userName:string, authToken: string, firstName: string, lastName: string, role: string, role2: string) {
        this.id = id;
        this.username = userName;
        this.authToken = authToken;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.role2 = role2;
    }

    getId() {
        return this.id;
    }

    getUserName() {
        return this.username;
    }
  
    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getRole() {
        return this.role;
    }

    getRole2() {
        return this.role2;
    }

    getAuthToken() {
        return "";
    }
}