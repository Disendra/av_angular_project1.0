import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor (private router: Router) {}

  socialLinks (type: any) {
    if (type === 'twitter') {
      window.open('https://twitter.com/rgbaudiovideo', '_blank')
    } else if (type === 'faceBook') {
      window.open('https://www.facebook.com/profile.php?id=61558649983492', '_blank')
    } else if (type === 'instagram') {
      window.open('https://www.instagram.com/av.champs/', '_blank')
    } else if (type === 'linkedin') {
      window.open('https://www.linkedin.com/in/avchamps/', '_blank')
    } else {
      window.open('https://youtube.com', '_blank')
    }
  }
}
