import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UserServicesService } from '../services/user-services.service'
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router'
import { image } from 'html2canvas/dist/types/css/types/image'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { PopupService } from '../services/popup.service'
import { AuthGuardService } from '../services/auth-guard.service'

@Component({
  selector: 'app-ekart',
  templateUrl: './ekart.component.html',
  styleUrls: ['./ekart.component.css']
})
export class EkartComponent implements OnInit {
  userName: any
  title!: string
  description!: string
  location!: string
  selectedFile: any
  mobileNumber!: number
  selectedFileName: any
  slNo!: number
  price!: number
  products: any[] = []
  uploadProducts: any[] = []
  profileImg: any[] = []
  showUpload: boolean = false
  showSpinner: boolean = false
  showContact: boolean = false
  showFile: boolean = true
  showCart: boolean = false
  showProducts: boolean = true
  showSearch: boolean = false
  showContactForm: boolean = false
  showViewMOre: boolean = true
  selectedItem: any
  offset: number = 0
  searchText: string = ''
  sellerButton: string = 'Upload'
  emailId: any
  @ViewChild('seller') sellerForm!: TemplateRef<any>
  @ViewChild('contact') onContact!: TemplateRef<any>
  insertionType: any

  constructor (
    private popup: PopupService,
    private userService: UserServicesService,
    private router: Router,
    private authService: AuthServiceService,
    private authGuard : AuthGuardService
  ) {}
  ngOnInit (): void {
    this.emailId = this.authService.getLoggedInEmail()
    this.userName = this.authService.getLoginuserName()
    this.getCartData(this.offset)
    this.getProfileImage()
  }

  loadMoreCartData () {
    this.offset += 5
    this.getCartData(this.offset)
  }

  loadMoreUploadData () {
    this.offset += 5
    this.getUploadProducts(this.offset)
  }

  toggleSearch () {
    this.showSearch = !this.showSearch
  }

  onSelect (option: any): void {
    if (option === 'myPosts') {
      this.showCart = true
      this.showProducts = false
      this.showContactForm = false
      this.getUploadProducts(0)
    } else if (option === 'products') {
      window.location.reload()
    } else if (option === 'contact') {
      this.showContactForm = true
      this.showCart = false
      this.showProducts = false
    } else {
      this.logOut()
    }
  }

  getUploadProducts (offset: any) {
    this.showSpinner = true
    this.userService.getUploadData(this.emailId, offset).subscribe(response => {
      console.log(response)
      this.uploadProducts = this.uploadProducts.concat(response.records)
      this.showSpinner = false
    })
  }

  getCartData (offset: number) {
    this.showSpinner = true
    this.userService
      .getCartData(offset, this.searchText)
      .subscribe((response: any) => {
        this.products = this.products.concat(response.records)
        console.log(response)
        this.showSpinner = false
      })
  }

  getProfileImage () {
    this.showSpinner = true
    this.userService
      .getProfileImage(this.emailId)
      .subscribe((response: any) => {
        console.log(response)
        this.showSpinner = false
        this.profileImg = response.records
      })
  }

  onSearch () {
    alert(this.showUpload)
    // alert(this.showProducts)
    this.products = []
    this.getCartData(0)
  }

  getImageSource (): string {
    if (this.profileImg && this.profileImg.length > 0) {
      return this.profileImg[0].imagePath
    } else {
      return '../assets/img/blank-user-directory.png'
    }
  }

  selectFile (): void {
    const fileInput = document.getElementById('fileInput')
    if (fileInput) {
      fileInput.click()
    } else {
      console.error('File input element not found.')
    }
  }

  onFileSelected (event: any) {
    this.selectedFile = event.target.files[0]
    const file = event.target.files[0]
    if (file) {
      this.selectedFileName = file.name
    } else {
      this.selectedFileName = ''
    }
  }

  validateInput (event: any) {
    const pattern = /[^a-zA-Z\s]/g
    event.target.value = event.target.value.replace(pattern, '') // Remove non-digits from input
    this.location = event.target.value // Update the model with the sanitized value
  }

  onUpload () {
    if (this.insertionType === 'insertProduct') {
      this.showSpinner = true
      const formData = new FormData()
      formData.append('emailId', this.emailId)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('location', this.location)
      formData.append('mobileNumber', this.mobileNumber.toString()) // Convert number to string
      formData.append('price', this.price.toString()) // Convert number to string
      formData.append('image', this.selectedFile)
      formData.append('userName', this.userName)
      this.userService.insertCart(formData).subscribe((response: any) => {
        console.log('Response from server:', response)
        this.showSpinner = false
        if (response && response.status) {
          this.userService.refreshData()
          alert(response.message)
          window.location.reload()
        } else {
          alert('An error occurred. Please try again later.')
        }
      })
    } else {
      this.updateProducts()
    }
  }

  updateProducts () {
    this.showSpinner = true
    const formData = new FormData()
    formData.append('emailId', this.emailId)
    formData.append('title', this.title)
    formData.append('description', this.description)
    formData.append('location', this.location)
    formData.append('mobileNumber', this.mobileNumber.toString()) // Convert number to string
    formData.append('price', this.price.toString()) // Convert number to string
    formData.append('image', this.selectedFile)
    formData.append('slNo', this.slNo.toString())
    this.userService.updateCartData(formData).subscribe((response: any) => {
      console.log('Response from server:', response)
      if (response && response.status) {
        this.userService.refreshData()
        this.showSpinner = false
        alert(response.message)
        // this.getUploadProducts(this.offset);
        window.location.reload()
      } else {
        alert('An error occurred. Please try again later.')
      }
    })
  }

  toggleChanged (event: MatSlideToggleChange, item: any) {
    if (event.checked) {
      let productStatus = 'soldOut'
      const confirmation = confirm('Are you sure that product is SoldOut?')
      if (!confirmation) {
        // If user cancels, revert toggle state
        event.source.checked = false
        return
      } else {
        const soldOutData = {
          slNo: item.slNo,
          productStatus: productStatus
        }
        this.userService.soldOut(soldOutData).subscribe((response: any) => {
          this.userService.refreshData()
          alert(response.message)
          this.getUploadProducts(this.offset)
        })
      }
    }
  }

  get filteredProducts () {
    return this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  get filteredUploadProducts () {
    return this.uploadProducts.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  deleteItem (item: any) {
    console.log(item)
    this.showSpinner = true
    const productData = {
      emailId: item.emailId,
      postedDate: item.postedDate,
      title: item.title
    }
    const confirmation = confirm('Are you sure you want to delete the Product?')
    if (!confirmation) {
      return
    }
    this.userService.deleteCartData(productData).subscribe((response: any) => {
      console.log('Response from server:', response)
      this.showSpinner = false
      if (response && response.status) {
        this.userService.refreshData()
        alert(response.message)
        this.getUploadProducts(this.offset)
      } else {
        alert('An error occurred. Please try again later.')
      }
    })
  }

  editItem (item: any) {
    this.sellerButton = 'Update'
    console.log(item)
    ;(this.emailId = item.emailId),
      (this.title = item.title),
      (this.description = item.description),
      (this.location = item.location),
      (this.mobileNumber = item.mobileNumber),
      (this.price = item.price),
      (this.slNo = item.slNo),
      this.onCart('updateProduct')
  }

  selectedProduct (index: any) {
    this.popup.openDialogWithTemplateRef(this.onContact)
    console.log(index)
    this.selectedItem = [index]
  }

  onCart (type: any) {
    if (type === 'insertProduct') {
      this.sellerButton = 'Submit'
      this.insertionType = type
      this.clearInputs()
    } else {
      this.insertionType = type
      this.sellerButton = 'Update'
    }
    this.popup.openDialogWithTemplateRef(this.sellerForm)
  }

  isValidMobileNumber (): boolean {
    const mobileStr = this.mobileNumber.toString()
    const repeatedPattern = /(\d)\1{9}/
    return mobileStr.length === 10 && !repeatedPattern.test(mobileStr)
  }

  clearInputs () {
    ;(this.title = ''),
      (this.description = ''),
      (this.price = 0),
      (this.mobileNumber = 0),
      (this.location = ''),
      (this.selectedFileName = '')
  }

  logOut () {
   this.authGuard.logout();
  }
}
