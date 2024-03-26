import { Component, TemplateRef, ViewChild, AfterViewInit, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UserServicesService } from '../services/user-services.service'
import { AuthServiceService } from '../services/auth-service.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  dialogRef: any
  emailId: any
  message: any
  rating: any;
  isDialogOpen: boolean = false;
  error : boolean = false;
  @ViewChild('firstDialog') firstDialog!: TemplateRef<any>

  constructor (
    private dialog: MatDialog,
    public userService: UserServicesService,
    private authService: AuthServiceService,
    private http: HttpClient
  ) {
    this.emailId = this.authService.getLoggedInEmail()
  }

  ngOnInit(): void {
    if (!this.isDialogOpen) { // Check if dialog is already open
      setTimeout(() => {
        this.openDialogWithTemplateRef(this.firstDialog);
      }, 30000);
    }
  }
  
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    if (!this.isDialogOpen) {
      this.dialogRef = this.dialog.open(templateRef, {
        disableClose: true
      });
      this.dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false; // Update flag when dialog is closed
      });
      this.isDialogOpen = true; // Update flag when dialog is opened
    }
  }
  
   
  

  displaySelectedRating (rating: any) {
    this.rating = rating
  }

  onSubmit () {
    if(this.rating) {
    const feedbackData = {
      rating: this.rating,
      emailId: this.emailId,
      message: this.message
    }
    this.userService.insertFeedback(feedbackData).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.error(error)
      }
    )
    this.dialogRef.close()
    }
    else {
      this.error = true;
    }
  }
}
