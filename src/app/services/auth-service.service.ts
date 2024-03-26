import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    
    private readonly EMAIL_KEY = 'loggedInEmail';
  
    constructor() { }
  
    saveLoggedInEmail(email: string) {
      sessionStorage.setItem(this.EMAIL_KEY, email);
    }
  
    getLoggedInEmail(): string | null {
      return sessionStorage.getItem(this.EMAIL_KEY);
    }
  
    clearLoggedInEmail() {
      sessionStorage.removeItem(this.EMAIL_KEY);
    }
  }
  
