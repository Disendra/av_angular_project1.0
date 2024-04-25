import { Injectable } from '@angular/core'
import { AuthServiceService } from './auth-service.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivateService {
  constructor (
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate (): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/home-page'])
      return false
    }
    return true
  }
}
