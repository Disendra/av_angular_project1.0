import { Component, OnInit } from '@angular/core';
import { FaServiceService } from '../services/fa-service.service';

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

  constructor(private faService: FaServiceService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.showSpinner = true;
    // const storedEmails = localStorage.getItem('email');
    // if (storedEmails) {
    //     this.email = JSON.parse(storedEmails);
    //     this.showSpinner = false;
    // } else {
        this.faService.getFeedData().subscribe((response: any) => {
            console.log('Response from server:', response);
            this.email = response.records;
            this.showSpinner = false;
            localStorage.setItem('email', JSON.stringify(this.email)); // Store fetched emails in local storage
        });
    }

    
  onBack() {
    this.showMails = true;
    this.selectedEmail = false;
  }

  selectEmail(email: any) {
    this.showMails = false;
    this.selectedEmail = true;
    console.log(email);
    this.clickedemails = [email];
    email.opened = true; // Assuming you have an 'opened' property in your email object
    localStorage.setItem('email', JSON.stringify(this.email)); // Store updated emails in local storage
  }

  get filteredEmails(): any[] {
    return this.email.filter(email =>
      email.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }
}
