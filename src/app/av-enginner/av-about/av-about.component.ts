import { DatePipe } from '@angular/common'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { AuthServiceService } from 'src/app/services/auth-service.service'
import { FaServiceService } from 'src/app/services/fa-service.service'
import { UserServicesService } from 'src/app/services/user-services.service'

@Component({
  selector: 'app-av-about',
  templateUrl: './av-about.component.html',
  styleUrls: ['./av-about.component.css']
})
export class AvAboutComponent implements OnInit {
  emailId: any
  dateOfBirth: any
  gender!: string
  mobileNumber: any
  userCity!: string
  companyName: any
  userEmailId: any
  jobTitle: any;
  userName: any
  products: any[] = []
  showSpinner: boolean = false;

  constructor (
    private userService: UserServicesService,
    private authService: AuthServiceService,private faService : FaServiceService,
    private datePipe: DatePipe
  ) {
    this.emailId = authService.getLoggedInEmail()
  }

  ngOnInit(): void {
    this.getProfileImage();
    this.getProfileData();
  }
  
  getProfileData() {
    this.showSpinner = true;
    this.userService.getProfile(this.emailId).subscribe((response: any) => {
      console.log(response);
      this.showSpinner = false;
      if (response.records.length !== 0) {
        const record = response.records[0];
        this.userName = record.userName || "not updated";
        this.userEmailId = record.userEmailId || "not updated";
        this.mobileNumber = (record.stdCode && record.mobileNumber) ? record.stdCode + '' + record.mobileNumber : "not updated";
        this.dateOfBirth = record.dob || "not updated";
        this.gender = record.gender || "not updated";
        this.userCity = (record.city && record.state) ? record.city + ',' + record.state : "not updated";
        this.jobTitle = record.jobTitle || "not updated";
        this.companyName = record.companyName || "not updated";
      } else {
        this.getSignUp(); // Call getSignUp() if no records found
      }
    });
  }
  
  getSignUp() {
    this.showSpinner = true;
    this.faService.getLoginData(this.emailId).subscribe((response: any) => {
      console.log(response);
      this.showSpinner = false;
      if (response.records.length !== 0) {
        const record = response.records[0];
        this.userName = record.userName || "not updated";
        this.userEmailId = record.emailId || "not updated";
        this.mobileNumber = "not updated";
        this.dateOfBirth = "not updated";
        this.gender = "not updated";
        this.userCity = "not updated";
        this.jobTitle = "not updated";
        this.companyName = "not updated";
      } else {
        // If no records found in getSignUp(), set default values
        this.userName = "not updated";
        this.userEmailId = "not updated";
        this.mobileNumber = "not updated";
        this.dateOfBirth = "not updated";
        this.gender = "not updated";
        this.userCity = "not updated";
        this.jobTitle = "not updated";
        this.companyName = "not updated";
      }
    });
  }
  


  getProfileImage () {
    this.showSpinner = true;
    this.userService.getProfileImage(this.emailId).subscribe((response: any) => {
        console.log(response)
        this.showSpinner = false;
        this.products = response.records
      })
  }

  getImageSource (): string {
    this.showSpinner = true
    if (this.products && this.products.length > 0) {
      this.showSpinner = false
      return this.products[0].imagePath
    } else {
      this.showSpinner = false
      return '../assets/img/blank-user-directory.png'
    }
  }

  formatDOB (dob: any) {
    if(dob) {
    return this.datePipe.transform(dob, 'dd MMMM yyyy')
  }
   return '';
}
}
