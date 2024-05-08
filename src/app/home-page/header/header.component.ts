import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showContact: boolean = false
  constructor (private router: Router) {}

  onLogin (option: any) {
    let value
    if (option === 'ekartLogin') {
      value = 'ekart-page'
    } else {
      value = 'av-community'
    }

    this.router.navigate(['/login-page', value])
  }
}
