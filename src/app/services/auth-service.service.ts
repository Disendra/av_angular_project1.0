import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    
    private readonly EMAIL_KEY = 'loggedInEmail';
    user_Name = 'loggedInuserName';
  
    constructor() { }
  
    saveLoggedInEmail(email: string) {
      sessionStorage.setItem(this.EMAIL_KEY, email);
    }
    
    saveUserName(userName:string) {
      sessionStorage.setItem(this.user_Name,userName);
    }
  
    getLoggedInEmail(): string | null {
      return sessionStorage.getItem(this.EMAIL_KEY);
    }

    getLoginuserName() {
      return sessionStorage.getItem(this.user_Name);
    }
  
    clearLoggedInEmail() {
      sessionStorage.removeItem(this.EMAIL_KEY);
    }
  }
  
