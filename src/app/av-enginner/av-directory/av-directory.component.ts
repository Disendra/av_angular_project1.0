import { Component, OnInit, ViewChild } from '@angular/core'
import { FaServiceService } from 'src/app/services/fa-service.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-av-directory',
  templateUrl: './av-directory.component.html',
  styleUrls: ['./av-directory.component.css']
})
export class AvDirectoryComponent implements OnInit {
  userData: any[] = []
  pagedUserData: any[] = []
  clickedUserData: any[] = []
  pageSize: number = 10
  searchBox: boolean = true
  companyName: string = 'Av Tech LTD'
  showClickedData: boolean = false
  showFilters: boolean = true
  showSpinner: boolean = false
  pageSizeOptions: number[] = [5, 10, 25, 100] // You can adjust these options
  filterTerm: string = '' // Add filter term
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor (private faService: FaServiceService) {}

  ngOnInit (): void {
    this.getData()
  }

  onBack () {
    this.searchBox = true
    this.showClickedData = false
  }

  getData () {
    this.showSpinner = true
    this.faService.getUserDetails().subscribe((response: any) => {
      console.log('Response from server:', response)
      this.userData = response.records
      this.applyFilter() // Apply filter when data is fetched
      this.updatePageData()
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

  applyFilter () {
    this.pagedUserData = this.userData.filter(
      item =>
        item.emailId.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(this.filterTerm.toLowerCase())
    )
    // Check if pagedUserData is empty
    if (this.pagedUserData.length === 0) {
      this.showFilters = false
    } else {
      this.showFilters = true
    }
  }

  showDetails (item: any) {
    this.searchBox = false
    this.showClickedData = true
    console.log('Clicked Item Details:', item)
    this.clickedUserData = [item]
  }

  formatUsername (emailId: string): string {
    const username = emailId.split('@')[0] // Extract username
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() // Convert to title case
  }
}
