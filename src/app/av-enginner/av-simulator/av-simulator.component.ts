import { Component, ElementRef, ViewChild } from '@angular/core'
import { ToWords } from 'to-words'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
@Component({
  selector: 'app-av-simulator',
  templateUrl: './av-simulator.component.html',
  styleUrls: ['./av-simulator.component.css']
})
export class AvSimulatorComponent {
  selectedImage: any
  isQuetation: boolean = true
  grandTotalWords: any
  toWordsInstance = new ToWords()
  @ViewChild('fileInput') fileInput!: ElementRef
  // Add an array to store your invoice items
  items = [
    {
      item: '',
      discription: '',
      make: '',
      quantity: 0,
      unitCost: 0,
      total: 0,
      cgst: 0,
      sgst: 0,
      cgstAmount: 0,
      sgstAmount: 0
    }
  ]

  overallTotal = 0 // Overall total for the Amount
  overallCGST = 0 // Overall total for CGST
  overallSGST = 0 // Overall total for SGST
  Total = 0
  calculateAmount (company: any) {
    // Assuming quantity and unitCost are numbers
    company.total = company.quantity * company.unitCost
    this.calculateGST(company)
    this.updateOverallTotal()
    this.updateTotal()
  }

  calculateGST (company: any) {
    // Assuming cgst and sgst are numbers
    company.cgstAmount = (company.cgst / 100) * company.total
    company.sgstAmount = (company.sgst / 100) * company.total
    this.updateOverallGST()
    this.updateTotal()
  }

  updateOverallTotal () {
    this.overallTotal = this.items.reduce(
      (total, company) => total + (company.total || 0),
      0
    )
  }

  updateOverallGST () {
    this.overallCGST = this.items.reduce(
      (total, company) => total + (company.cgstAmount || 0),
      0
    )
    this.overallSGST = this.items.reduce(
      (total, company) => total + (company.sgstAmount || 0),
      0
    )
  }

  updateTotal () {
    this.Total = this.items.reduce(
      (total, company) =>
        total + (company.total + company.cgstAmount + company.sgstAmount || 0),
      0
    )
    this.grandTotalWords = this.toWordsInstance.convert(this.Total)
  }

  // companies = [
  //   { name: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany' },
  //   { name: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico' },
  //   { name: 'Ernst Handel', contact: 'Roland Mendel', country: 'Austria' },
  //   { name: 'Island Trading', contact: 'Helen Bennett', country: 'UK' },
  //   { name: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada' },
  //   { name: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy' },
  // ];

  addRow () {
    // Add a new item to the invoiceItems array
    this.items.push({
      item: '',
      discription: '',
      make: '',
      quantity: 0,
      unitCost: 0,
      sgst: 0,
      cgst: 0,
      total: 0,
      cgstAmount: 0, // Add cgstAmount property
      sgstAmount: 0 // Add sgstAmount property
    })
  }

  removeRow () {
    // Remove the last item from the invoiceItems array
    if (this.items.length > 1) {
      this.items.pop()
    }
  }

  imgData: string | null = null
  seletedFile: any
  fileSelected: boolean = false

  onFileSelected (event: any): void {
    const file: File = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.imgData = e.target?.result as string
        this.fileSelected = true
      }
      reader.readAsDataURL(file)
    }
  }

  openFileInput (): void {
    // Trigger the file input when the image is clicked
    if (this.fileInput) {
      this.fileInput.nativeElement.click()
    }
  }

  downloadCard () {
    const element = document.getElementById('pdfContent')

    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()

        const imgWidth = 150
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Calculate the center position of the page
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const xPosition = (pageWidth - imgWidth) / 2
        const yPosition = (pageHeight - imgHeight) / 2

        // Add the image to the PDF at the center position
        pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight)

        // Save the PDF
        pdf.save('Quatation.pdf')
      })
    } else {
      console.error("Element with id 'pdfContent' not found.")
    }
  }
}
