import { Component } from '@angular/core'
import { FaServiceService } from 'src/app/services/fa-service.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  personName: any
  emailId: any
  mobileNumber: any
  subject: any
  message: any

  constructor (private faService: FaServiceService) {}

  onSubmit () {
    const contactData = {
      personName: this.personName,
      emailId: this.emailId,
      mobileNumber: this.mobileNumber,
      subject: this.subject,
      message: this.message
    }
    this.faService.contactUs(contactData).subscribe(
      (response: any) => {
        alert(response.message);
        // this.onReload();
      },
      (error: any) => {
        console.error('An error occurred:', error)
        alert('An error occurred. Please try again later.')
      }
    )
  }


onReload() {
  window.location.reload();
}
}