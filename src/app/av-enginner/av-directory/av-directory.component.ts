import { Component, OnInit, ViewChild } from '@angular/core'
import { FaServiceService } from 'src/app/services/fa-service.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { UserServicesService } from 'src/app/services/user-services.service'
import { AuthServiceService } from 'src/app/services/auth-service.service'

@Component({
  selector: 'app-av-directory',
  templateUrl: './av-directory.component.html',
  styleUrls: ['./av-directory.component.css']
})
export class AvDirectoryComponent implements OnInit {
  twitterUrl: any
  facebookUrl: any
  instagramUrl: any
  linkedInUrl: any
  userEmailId: any
  imagePath: any
  userData: any[] = []
  pagedUserData: any[] = []
  clickedUserData: any[] = []
  profileData: any[] = []
  pageSize: number = 10
  companyName!: string
  profileImage: any[] = []
  showClickedData: boolean = false
  showFilters: boolean = true
  searchBox: boolean = true
  showSpinner: boolean = false
  filterTerm: string = ''
  emptyLinks: string = 'The user has not updated'
  pageSizeOptions: number[] = [5, 10, 25, 100]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor (
    private faService: FaServiceService,
    private userService: UserServicesService,
    private authService: AuthServiceService
  ) {}

  ngOnInit (): void {
    this.getData()
  }

  getImageSource (): string {
    this.showSpinner = true
    if (this.profileImage && this.profileImage.length > 0) {
      this.showSpinner = false
      return this.profileImage[0].imagePath
    } else {
      this.showSpinner = false
      return 'assets/img/empty_Image.png'
    }
  }

  getData () {
    this.showSpinner = true
    this.faService.getUserDetails().subscribe((response: any) => {
      console.log('Response from server:', response)
      this.userData = response.records
      this.userEmailId = response.emailId
      this.applyFilter() // Apply filter when data is fetched
      this.updatePageData()
      this.showSpinner = false
      this.fetchProfileImages()
    })
    this.userService.getProfileData().subscribe((response: any) => {
      console.log('Response from server:', response)
      this.profileData = response.records
    })
  }

  fetchProfileImages() {
    this.userService.getUserImages().subscribe((response: any) => {
      console.log(response)
      const profileImages = response.records
      this.userData.forEach(user => {
        const profileImage = profileImages.find((profile: { emailId: any }) => profile.emailId === user.emailId)
        const profileData = this.profileData.find((profile: { emailId: any }) => profile.emailId === user.emailId)
  
        if (profileImage) {
          user.imagePath = profileImage.imagePath;
        } else {
          user.imagePath = '../assets/img/user-Icon.png';
        }
        
        if (profileData) {
          user.companyName = profileData.companyName;
        }
      })
  
      console.log(this.userData)
      this.showSpinner = false
    })
  }
  
  updatePageData () {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    this.pagedUserData = this.userData.slice(
      startIndex,
      startIndex + this.paginator.pageSize
    )
  }

  onPageChange (event: PageEvent) {
    this.updatePageData()
  }

  applyFilter() {
    this.pagedUserData = this.userData.filter(
      item =>
        item.userName.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(this.filterTerm.toLowerCase())
    );  
    if (this.pagedUserData.length > 0) {
      this.showFilters = true;
      if (this.paginator) {
        this.paginator.length = this.pagedUserData.length;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.pagedUserData = this.pagedUserData.slice(
          startIndex,
          startIndex + this.paginator.pageSize
        );
      }
    } else {
      this.showFilters = false;
    }
  }
  

  showDetails (item: any) {
    this.searchBox = false
    this.showSpinner = true
    this.showClickedData = true
    console.log('Clicked Item Details:', item)
    let emailId = item.emailId
    this.userService
      .getSocialMediaProfile(emailId)
      .subscribe((response: any) => {
        this.showSpinner = false
        let records = response.records[0]
        if (response.records.length !== 0) {
          this.twitterUrl = records.twitter || null
          this.facebookUrl = records.faceBook || null
          this.instagramUrl = records.instagram || null
          this.linkedInUrl = records.linkedIn || null
        }
      })

    this.userService.getProfile(emailId).subscribe((response: any) => {
      this.showSpinner = false
      let records = response.records[0]
      if (response.records.length !== 0) {
        this.companyName = records.companyName
      }
    })

    this.userService.getProfileImage(emailId).subscribe((response: any) => {
      this.showSpinner = false
      let records = response.records[0]
      if (response.records.length !== 0) {
        this.imagePath = records.imagePath
      } else {
        this.imagePath = '../assets/img/blank-user-directory.png'
      }
    })

    this.clickedUserData = [item]
  }

  onBack () {
    this.companyName = ''
    this.instagramUrl = ''
    this.facebookUrl = ''
    this.twitterUrl = ''
    this.linkedInUrl = ''
    this.searchBox = true
    this.showClickedData = false
    this.imagePath = ''
  }
}
