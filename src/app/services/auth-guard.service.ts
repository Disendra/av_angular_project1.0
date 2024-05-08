import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { FaServiceService } from './fa-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  token : any;
  constructor(private router: Router,private faService : FaServiceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Observable<boolean>((observer) => {
        this.faService.getSession().subscribe(
          (response) => {
            const token = response.session;
            if (token) {
              localStorage.setItem('jwtToken', token); 
              observer.next(true); 
            } else {
              this.router.navigate(['/login']);
              observer.next(false); 
            }
            observer.complete();
          },
          (error) => {
            console.error('Error fetching session:', error);
            this.router.navigate(['/home-page']);
            observer.next(false); 
            observer.complete(); 
          }
        );
      });
  }
  
  logout() {
    this.faService.logout().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/home-page']);
      },(error) => {
        console.error(error); 
      }
    );
  }
  
}