import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor (private router: Router) { }

  activeTab: string = 'hero'; // Set default active tab

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onLogin (option: any) {
    let value
    if (option === 'dashboardLogin') {
      value = 'Dashboard'
    } else {
      value = 'eKart'
    }
    this.router.navigate(['/login-page', value])
  }
}
