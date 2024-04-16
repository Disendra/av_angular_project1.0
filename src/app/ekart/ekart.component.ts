import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UserServicesService } from '../services/user-services.service'
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router'
import { image } from 'html2canvas/dist/types/css/types/image'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'

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
  profileImg: any[] = []
  showUpload: boolean = false
  showContact: boolean = false
  showSpinner: boolean = false
  showFile: boolean = true
  showCart: boolean = false
  showProducts: boolean = true
  selectedItem: any
  searchText: string = ''
  sellerButton: string = 'Upload'
  emailId: any
  @ViewChild('seller') sellerForm!: TemplateRef<any>
  @ViewChild('contact') onContact!: TemplateRef<any>
  insertionType: any

  constructor (
    private dialog: MatDialog,
    private userService: UserServicesService,
    private router: Router,
    private authService: AuthServiceService
  ) {}
  ngOnInit (): void {
    this.emailId = this.authService.getLoggedInEmail()
    this.userName = this.authService.getLoginuserName()
    this.getCartData()
    this.getProfileImage()
  }

  onSelect (option: any): void {
    if (option === 'myPosts') {
      this.getUploadProducts()
      this.showCart = true
      this.showProducts = false
    } else if (option === 'products') {
      window.location.reload()
    } else {
      this.logOut()
    }
  }

  getUploadProducts () {
    this.showSpinner = true
    this.userService.getUploadData(this.emailId).subscribe(response => {
      console.log(response)
      this.showSpinner = false
      this.products = response.records
    })
  }

  getCartData () {
    this.showSpinner = true
    this.userService.getCartData().subscribe((response: any) => {
      this.showSpinner = false
      this.products = response.records
      console.log(response)
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

  getImageSource (): string {
    this.showSpinner = true
    if (this.profileImg && this.profileImg.length > 0) {
      this.showSpinner = false
      return this.profileImg[0].imagePath
    } else {
      this.showSpinner = false
      return '../assets/img/blank-user-directory.png'
    }
  }

  selectFile(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input element not found.");
    }
  }
  

  onFileSelected (event: any) {
    this.selectedFile = event.target.files[0]
     const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
    } else {
      this.selectedFileName = '';
    }
  }

  onUpload () {
    if (this.insertionType === 'insertProduct') {
      this.showSpinner = true // Show spinner before making HTTP request
      // this.showFile = true;
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
        this.showSpinner = false // Hide spinner after receiving response
        if (response && response.status) {
          // alert(response.message)
          // window.location.reload()
          this.userService.refreshData()
          alert(response.message)
          this.getCartData()
        } else {
          alert('An error occurred. Please try again later.')
        }
      })
    } else {
      this.updateProducts()
    }
  }

  updateProducts () {
    this.showSpinner = true // Show spinner before making HTTP request
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
        // alert(response.message)
        // window.location.reload()
        this.userService.refreshData()
        this.showSpinner = false
        alert(response.message)
        this.getUploadProducts()
      } else {
        alert('An error occurred. Please try again later.')
      }
    })
  }

  toggleChanged(event: MatSlideToggleChange, item: any) {
    if (event.checked) {
      let productStatus = 'soldOut';
      const confirmation = confirm('Are you sure that product is SoldOut?');
      if (!confirmation) {
        // If user cancels, revert toggle state
        event.source.checked = false;
        return;
      } else {
        const soldOutData = {
          slNo: item.slNo,
          productStatus: productStatus
        };
        this.userService.soldOut(soldOutData).subscribe((response: any) => {
          this.userService.refreshData();
          alert(response.message);
          this.getUploadProducts();
        });
      }
    }
  }
  
  
  

  get filteredProducts () {
    return this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  deleteItem (item: any) {
    console.log(item)
    const productData = {
      emailId: item.emailId,
      postedDate: item.postedDate,
      title: item.title
    }
    const confirmation = confirm('Are you sure you want to delete the Product?')
    if (!confirmation) {
      return // Exit the function if user cancels the operation
    }
    this.userService.deleteCartData(productData).subscribe((response: any) => {
      console.log('Response from server:', response)
      this.showSpinner = false // Hide spinner after receiving response
      if (response && response.status) {
        // alert(response.message)
        // window.location.reload()
        this.userService.refreshData()
        alert(response.message)
        this.getUploadProducts()
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
    this.openDialogWithTemplateRef(this.onContact)
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
    this.openDialogWithTemplateRef(this.sellerForm)
  }

  openDialogWithTemplateRef (templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.dialog.open(templateRef)
    } else {
      console.error('TemplateRef is undefined')
    }
  }

  clearInputs () {
    (this.title = ''),
      (this.description = ''),
      (this.price = 0),
      (this.mobileNumber = 0),
      (this.location = ''),
      (this.selectedFileName = '')
  }

  logOut () {
    this.authService.clearLoggedInEmail()
    this.router.navigate(['/home-page']).then(() => {
      window.location.reload()
    })
  }

  
}
