import { Component, OnInit } from '@angular/core';
import { FaServiceService } from '../services/fa-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  selectedEmail: boolean = false;
  showMails: boolean = true;
  email: any[] = [];
  clickedemails: any[] = [];
  showSpinner: boolean = false;
  searchTitle: string = '';

  constructor(
    private faService: FaServiceService,
    private authService: AuthServiceService // Inject your session service
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.showSpinner = true;
    this.faService.getFeedData().subscribe((response: any) => {
      console.log('Response from server:', response);
      this.email = response.records;
      this.showSpinner = false;
      // Clear new image flag for opened emails
      this.email.forEach(email => {
        if (this.authService.isEmailOpened(email.title)) {
          email.opened = true;
        }
      });
    });
  }

  onBack() {
    this.showMails = true;
    this.selectedEmail = false;
  }

  selectEmail(email: any) {
    console.log(email);
    this.showMails = false;
    this.selectedEmail = true;
    this.clickedemails = [email];
    email.opened = true;
    // Save opened email status in session
    this.authService.markEmailAsOpened(email.title);
  }

  get filteredEmails(): any[] {
    return this.email.filter(email =>
      email.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }
}
