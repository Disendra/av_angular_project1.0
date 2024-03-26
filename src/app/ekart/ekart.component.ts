import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UserServicesService } from '../services/user-services.service'
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router'
import { image } from 'html2canvas/dist/types/css/types/image'

@Component({
  selector: 'app-ekart',
  templateUrl: './ekart.component.html',
  styleUrls: ['./ekart.component.css']
})
export class EkartComponent implements OnInit {
  userName = 'Disendra'
  title!: string
  description!: string
  location!: string
  selectedFile: any
  mobileNumber!: number
  slNo!: number
  price!: number
  products: any[] = []
  showUpload: boolean = false
  showContact: boolean = false
  showSpinner: boolean = false
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

    this.getCartData()
  }

  cartItems = [
    {
      imageUrl:
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp',
      name: 'Basic T-shirt',
      size: 'M',
      color: 'Grey',
      quantity: 2,
      price: 499.0
    },
    {
      imageUrl:
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp',
      name: 'Basic T-shirt',
      size: 'M',
      color: 'Grey',
      quantity: 2,
      price: 499.0
    },
    {
      imageUrl:
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp',
      name: 'Basic T-shirt',
      size: 'M',
      color: 'Grey',
      quantity: 2,
      price: 499.0
    }
    // Add more items if needed
  ]

  onSelect (option: any): void {
    if (option === 'orders') {
      this.getUploadProducts()
      this.showCart = true
      this.showProducts = false
    } else if (option === 'products') {
      this.showProducts = true
      this.showCart = false
    } else {
      this.logOut()
    }
  }

  getUploadProducts () {
    this.showSpinner = true
    this.userService.getUploadData(this.emailId).subscribe(response => {
      this.showSpinner = false
      console.log(response)
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

  onFileSelected (event: any) {
    this.selectedFile = event.target.files[0]
  }

  onUpload () {
    if (this.insertionType === 'insertProduct') {
      this.showSpinner = true // Show spinner before making HTTP request
      if (
        !this.emailId ||
        !this.title ||
        !this.description ||
        !this.location ||
        !this.mobileNumber ||
        !this.price ||
        !this.selectedFile
      ) {
        alert('Please fill in all required fields.')
        this.showSpinner = false // Hide spinner if validation fails
        return
      }
      const formData = new FormData()
      formData.append('emailId', this.emailId)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('location', this.location)
      formData.append('mobileNumber', this.mobileNumber.toString()) // Convert number to string
      formData.append('price', this.price.toString()) // Convert number to string
      formData.append('image', this.selectedFile)
      this.userService.insertCart(formData).subscribe((response: any) => {
        console.log('Response from server:', response)
        this.showSpinner = false // Hide spinner after receiving response
        if (response && response.status) {
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
    this.showSpinner = true // Show spinner before making HTTP request
    if (
      !this.emailId ||
      !this.title ||
      !this.description ||
      !this.location ||
      !this.mobileNumber ||
      !this.price
    ) {
      alert('Please fill in all required fields.')
      this.showSpinner = false // Hide spinner if validation fails
      return
    }
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
      this.showSpinner = false // Hide spinner after receiving response
      if (response && response.status) {
        alert(response.message)
        window.location.reload()
      } else {
        alert('An error occurred. Please try again later.')
      }
    })
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
        alert(response.message)
        window.location.reload()
      } else {
        alert('An error occurred. Please try again later.')
      }
    })
  }

  // emailId, title, description, location, mobileNumber, price,slNo

  editItem (item: any) {
    this.sellerButton = 'Update'
    console.log(item)
    ;(this.emailId = item.emailId),
      (this.title = item.title),
      (this.description = item.description),
      (this.location = item.location),
      (this.mobileNumber = item.mobileNumber),
      (this.price = item.price),
      (this.slNo = item.slNo)
    this.onCart('updateProduct')
  }

  formatUsername (emailId: string): string {
    const username = emailId.split('@')[0] // Extract username
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() // Convert to title case
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

  logOut () {
    this.authService.clearLoggedInEmail()
    this.router.navigate(['/home-page']).then(() => {
      window.location.reload()
    })
  }
}
