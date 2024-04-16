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
      window.open('https://faceBook.com', '_blank')
    } else if (type === 'instagram') {
      window.open('https://instagram.com', '_blank')
    } else if (type === 'linkedin') {
      window.open('https://www.linkedin.com/in/av-universe-622053229/', '_blank')
    } else {
      window.open('https://youtube.com', '_blank')
    }
  }
}
