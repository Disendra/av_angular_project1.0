import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import html2canvas from 'html2canvas'
import { PopupService } from '../services/popup.service'
import { DOCUMENT, Location } from '@angular/common' // Import Location
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { AuthServiceService } from '../services/auth-service.service'
import { UserServicesService } from '../services/user-services.service'
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-bussiness-card',
  templateUrl: './bussiness-card.component.html',
  styleUrls: ['./bussiness-card.component.css']
})
export class BussinessCardComponent implements OnInit {
  qrdata: any
  isCard: boolean = true
  isBusinessCardStyles: boolean = false
  linkCopied: boolean = false
  showSpinner: boolean = false
  showErrorMsg: boolean = false
  currentRoute: string = ''
  urlLink: any
  userName: any
  mobileNumber!: number
  designation!: string
  companyName!: string
  emailId: any
  key = 'encrypt!135790'
  linkedIn: string = 'https://www.linkedin.com/in/disendra-yadav-b6b1a9220'
  instagram: string = 'https://www.instagram.com/'
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor (
    private dialog: MatDialog,
    public router: Router,
    private authSerice: AuthServiceService,
    private userService: UserServicesService,
    private popup: PopupService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.applyCustomCss()
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['emailId']) {
        const encodedString = params['emailId'];
        const decryptedString = this.decrypt(decodeURIComponent(encodedString));
        this.emailId = decryptedString;
      } else {
        this.emailId = this.authSerice.getLoggedInEmail();
      }
      this.getBussinessData();
    });

    const encryptedString = encodeURIComponent(this.encrypt(this.emailId));
    this.urlLink = this.document.location.origin + '/bussiness-card/' + encryptedString;
  }

  encrypt(emailId: string): string {
    return CryptoJS.AES.encrypt(emailId, this.key).toString();
  }

  decrypt(passwordToDecrypt: string): string {
    return CryptoJS.AES.decrypt(passwordToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  applyCustomCss () {
    if (this.router.url.startsWith('/bussiness-card')) {
      this.isBusinessCardStyles = true
    } else {
      this.isBusinessCardStyles = false
    }
  }

  shareOnSocialMedia () {
    this.popup.openDialogWithTemplateRef(this.myDialog)
  }

  copyToClipboard () {
    const tempInput = document.createElement('input')
    tempInput.value = this.urlLink
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    this.linkCopied = true

    setTimeout(() => {
      this.linkCopied = false
    }, 3000)
  }

  getBussinessData () {
    this.showSpinner = true
    // this.userService.getBussinessCard(this.emailId).subscribe(response => {
    //   this.showSpinner = false;
    //   console.log(response);
    //   if (response && response.records && response.records.length > 0) {
    //     this.emailId = response.records[0].emailId;
    //     this.userName = response.records[0].userName;
    //     this.qrCodeData();
    //   }
    // }, error => {
    //   console.error("Error fetching business card data:", error);
    // });

    this.userService.getProfile(this.emailId).subscribe(
      response => {
        this.showSpinner = false
        if (response && response.records && response.records.length > 0) {
          let records = response.records[0]
          if (
            records.userName &&
            records.userEmailId &&
            records.companyName &&
            records.jobTitle &&
            records.mobileNumber
          ) {
            this.emailId = records.userEmailId
            this.userName = records.userName
            this.companyName = records.companyName
            this.designation = records.jobTitle
            this.mobileNumber = records.mobileNumber
            this.qrCodeData()
          } else {
            // alert("Some properties in the records are null or undefined.");
            this.showErrorMsg = true
          }
        } else {
          console.log('No records found.');
          this.showErrorMsg = true;
        }
      },
      error => {
        console.error('Error fetching business card data:', error)
      }
    )
  }

  qrCodeData () {
    let qrDataParts = []
    if (this.userName) {
      qrDataParts.push(this.userName)
    }
    if (this.mobileNumber) {
      qrDataParts.push(this.mobileNumber)
    }
    if (this.emailId) {
      qrDataParts.push(this.emailId)
    }
    if (this.designation) {
      qrDataParts.push(this.designation)
    }
    this.qrdata = qrDataParts.join('\n')
  }

  closePopup () {
    this.popup.closeDialog()
  }

  downloadCard () {
    let fileName = 'Business-Card.png'
    let element = document.querySelector(
      '.container.card-Container'
    ) as HTMLElement

    if (element) {
      element.style.borderRadius = '0px'
      const canvas = document.createElement('canvas')
      canvas.width = 420
      canvas.height = 230
      const context = canvas.getContext('2d')
      const rect = element.getBoundingClientRect()

      html2canvas(element, { scale: 1 }).then(canvasContent => {
        context?.drawImage(canvasContent, 0, 0, canvas.width, canvas.height)

        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = imgData
        link.download = fileName
        link.click()

        element.style.borderRadius = '0px'
      })
    } else {
      console.error('Card container not found.')
    }
  }
}
